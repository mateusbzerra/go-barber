import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderWrapper,
  Profile,
  Content,
  Schedule,
  NextAppointments,
  Section,
  Appointment,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  }, []);
  const { signOut } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderWrapper>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img
              src="https://avatars0.githubusercontent.com/u/17644982?s=460&u=eb3394a14934d0228207c4071cc79edf80cac825&v=4"
              alt="Mateus Bezerra"
            />
            <div>
              <span>Bem Vindo</span>
              <strong>Mateus Bezerra</strong>
            </div>
          </Profile>
          <button onClick={signOut} type="button">
            <FiPower />
          </button>
        </HeaderWrapper>
      </Header>
      <Content>
        <Schedule>
          <h1>Horário Agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda Feira</span>
          </p>
          <NextAppointments>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/17644982?s=460&u=eb3394a14934d0228207c4071cc79edf80cac825&v=4"
                alt="Mateus Bezerra"
              />
              <strong>Mateus Bezerra</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointments>

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/17644982?s=460&u=eb3394a14934d0228207c4071cc79edf80cac825&v=4"
                  alt="Mateus Bezerra"
                />
                <strong>Mateus Bezerra</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/17644982?s=460&u=eb3394a14934d0228207c4071cc79edf80cac825&v=4"
                  alt="Mateus Bezerra"
                />
                <strong>Mateus Bezerra</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/17644982?s=460&u=eb3394a14934d0228207c4071cc79edf80cac825&v=4"
                  alt="Mateus Bezerra"
                />
                <strong>Mateus Bezerra</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                09:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/17644982?s=460&u=eb3394a14934d0228207c4071cc79edf80cac825&v=4"
                  alt="Mateus Bezerra"
                />
                <strong>Mateus Bezerra</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }]}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
