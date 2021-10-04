import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);
import { Auth } from "aws-amplify";
import {
  StatusBar
} from "react-native";

//COMPONENTSs
import StackLogin from './src/Navigation/StackLogin';
import Tabs from './src/Navigation/Tabs';
import { colors } from "./src/styles/styles";

const Stack = createNativeStackNavigator();

const App = () => {

  const [ruta, setRuta ] = useState(false);

  const rutaRef = useRef(false);

  return (
      <NavigationContainer>
        <StatusBar backgroundColor={colors.BLUE_COLOR} barStyle="light-content"/>
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="NavigationLogin" component={StackLogin} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeTab" component={Tabs} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;
