import { StyleSheet, Text, View } from 'react-native';
// Provide the Redux Store to React
import { userStore } from './src/stores/userStore.js'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './src/navigation/bottomTabNavigator.js'

export default function App() {
  return (
    <Provider store={userStore}>
      <NavigationContainer>
        <MyTabs backgroundColor="red" />
      </NavigationContainer>
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
