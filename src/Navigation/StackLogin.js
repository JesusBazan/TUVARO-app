import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//COMPONENTS
import Register from '../Screens/Register';
import Login from '../Screens/Login';

const Stack = createNativeStackNavigator();

const StackLogin = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
    )
}

export default StackLogin;