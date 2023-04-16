import React from 'react';
import {View} from 'react-native';
import StackNavigator from './screens/config/NavigatorConfig';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator></StackNavigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
