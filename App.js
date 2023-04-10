// Provide the Redux Store to React
import { store } from './src/stores/store.js'
import { Provider } from 'react-redux'
import SwitchNavigator from './src/navigation/switchNavigator.js';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SwitchNavigator />
      </NavigationContainer>
    </Provider>
  );
}
