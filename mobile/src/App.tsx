import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <StatusBar translucent barStyle="light-content" />
    <AppProvider>
      <Routes />
    </AppProvider>
  </>
);

export default App;
