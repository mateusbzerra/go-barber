import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Container,
  Title,
  Description,
  OKButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const navigation = useNavigation();
  const router = useRoute();

  const routeParams = router.params as RouteParams;

  const formattedDate = useMemo(
    () =>
      format(
        routeParams.date,
        "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h' ",
        { locale: ptBR },
      ),
    [routeParams.date],
  );

  const handleOkPressed = useCallback(
    () =>
      navigation.reset({
        routes: [{ name: 'Dashboard' }],
        index: 0,
      }),
    [navigation],
  );
  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />
      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>
      <OKButton onPress={handleOkPressed}>
        <OkButtonText>Ok</OkButtonText>
      </OKButton>
    </Container>
  );
};

export default AppointmentCreated;
