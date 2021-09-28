import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//COMPONENTS
import Register from "../Screens/Register";
import Login from "../Screens/Login";

const Stack = createNativeStackNavigator();

const StackLogin = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackLogin;
