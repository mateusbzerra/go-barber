import React from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderWrapper,
  Profile,
  Content,
  Schedule,
  NextAppointments,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
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
        </Schedule>

        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;
