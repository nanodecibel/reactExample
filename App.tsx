// Importa las librerías necesarias
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Switch, SafeAreaView } from 'react-native';
import { ThemeContext } from './src/context/ThemeContext';
import { myColors } from './src/styles/Colors';
import LoginScreen from './src/components/LoginScreen'; // Importa la pantalla de inicio de sesión
import MyKeyboard from './src/components/MyKeyboard';
import ClickerGame from './src/components/ClickerGame';
// Crea un StackNavigator
const Stack = createStackNavigator();

export default function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      {/* Quita el SafeAreaView envolviendo el NavigationContainer */}
      <NavigationContainer>
        <StatusBar style="auto" />
        <Switch
          value={theme === 'light'}
          onValueChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        />
        {/* Agrega estilos directamente al NavigationContainer */}
        <SafeAreaView style={[styles.container, { backgroundColor: theme === 'light' ? myColors.light : '#000' }]}>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="MyKeyboard" component={MyKeyboard} />
            <Stack.Screen name="ClickerGame" component={ClickerGame} />

          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Elimina alignItems y justifyContent
  },
});
