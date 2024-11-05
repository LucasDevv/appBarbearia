import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { Provider as PaperProvider, MD3LightTheme  } from 'react-native-paper';

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FF9A3E', // Cor primária personalizada
    background: '#ffffff', // Cor de fundo personalizada
    surface: '#302238',
    text: '#000000',
    onPrimary: '#ffffff',
  },
};

const App = () => {
  return (
    <PaperProvider theme={customTheme}>
        <HomeScreen />
    </PaperProvider>
  );
};

export default App;
