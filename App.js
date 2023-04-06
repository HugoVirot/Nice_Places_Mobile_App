import { StyleSheet } from 'react-native';
// Provide the Redux Store to React
import { store } from './src/stores/store.js'
import { useSelector, Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { LoggedUserTabs, GuestTabs } from './src/navigation/bottomTabNavigator.js'

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        { store.getState().user.userLoggedIn ? <LoggedUserTabs /> : <GuestTabs />}
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
