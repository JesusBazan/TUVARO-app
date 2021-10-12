import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);
import {
  StatusBar
} from "react-native";
import {Provider} from 'react-redux';

//COMPONENTSs
import StackLogin from './src/Navigation/StackLogin';
import { colors } from "./src/styles/styles";
import Tabs from './src/Navigation/Tabs';
import {store} from "./src/store/store";

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar backgroundColor={colors.BLUE_COLOR} barStyle="light-content"/>
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="NavigationLogin" component={StackLogin} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeTab" component={Tabs} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;
