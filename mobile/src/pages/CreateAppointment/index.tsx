import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

import { useRoute, useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  Content,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface RouteParams {
  providerId: string;
}
export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(0);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(
    routeParams.providerId,
  );

  const { user } = useAuth();
  const navigation = useNavigation();
  useEffect(() => {
    api.get('providers').then(({ data }) => {
      setProviders(data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => setAvailability(response.data));
  }, [selectedProvider, selectedDate]);

  const navigateBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleSelectProvider = useCallback(
    (providerId: string) => setSelectedProvider(providerId),
    [],
  );

  const toggleDatePicker = useCallback(
    () => setShowDatePicker((oldValue) => !oldValue),
    [],
  );

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }
      if (date) {
        setSelectedDate(date);
      }
      return date;
    },
    [],
  );

  const handleSelectHour = useCallback(
    (hour: number) => setSelectedHour(hour),
    [],
  );

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);
      await api.post('appointments', {
        provider_id: selectedProvider,
        date,
      });
      navigation.navigate('AppointmentCreated', { date: date.getTime() });
    } catch {
      Alert.alert(
        'Ops...',
        'Ocorreu um erro ao tentar criar o agendamento, tente novamente',
      );
    }
  }, [navigation, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter((item) => item.hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter((item) => item.hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [availability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            keyExtractor={(provider) => provider.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(item.id)}
                selected={selectedProvider === item.id}
              >
                <ProviderAvatar source={{ uri: item.avatar_url }} />
                <ProviderName selected={selectedProvider === item.id}>
                  {item.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>
        <Calendar>
          <Title>Escolha a data</Title>
          <OpenDatePickerButton onPress={toggleDatePicker}>
            <OpenDatePickerText>Selecionar outra data</OpenDatePickerText>
          </OpenDatePickerButton>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              textColor="#f4ede8"
              onChange={handleDateChanged}
              value={selectedDate}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha um horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hour, hourFormatted, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectHour(hour)}
                  available={available}
                  key={hourFormatted}
                >
                  <HourText selected={selectedHour === hour}>
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ hour, hourFormatted, available }) => (
                  <Hour
                    enabled={available}
                    selected={selectedHour === hour}
                    onPress={() => handleSelectHour(hour)}
                    available={available}
                    key={hourFormatted}
                  >
                    <HourText selected={selectedHour === hour}>
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
