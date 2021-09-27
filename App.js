import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//COMPONENTSs
import StackLogin from './src/Navigation/StackLogin';
import Tabs from './src/Navigation/Tabs';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{gestureEnabled: false}}>
          <Stack.Screen name="NavigationLogin" component={StackLogin} options={{ headerShown: false }}/>
          <Stack.Screen name="HomeTab" component={Tabs} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App;
