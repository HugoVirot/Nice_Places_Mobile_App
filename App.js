import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Provide the Redux Store to React
import { store } from './src/stores/store.js'
import { Provider } from 'react-redux'
import Home from './src/screens/Accueil.js'
import Counter from './src/features/counter/Counter.js'
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/navigation/bottomTabNavigator.js'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { apiUserSlice } from './src/api/apiUserSlice.js';

export default function App() {
  return (
    <Provider store={store}>
      <ApiProvider api={apiUserSlice}>
      <NavigationContainer>
        <MyTabs backgroundColor="red" />
      </NavigationContainer>
      </ApiProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
