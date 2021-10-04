import React from 'react';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons } from "@expo/vector-icons";

import NewExpense from '../Screens/NewExpense';
import Report from '../Screens/Report';
import Home from '../Screens/Home';
import { colors } from '../styles/styles';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: colors.GREEN_1_COLOR,
            tabBarInactiveTintColor: colors.GREEN_1_COLOR,
            showIcon: true,
            tabBarShowLabel: false,
            lazyLoad: true,
            tabBarStyle: { 
                backgroundColor: "transparent", 
                elevation: 0,
                borderTopWidth: 0,
                position: 'absolute',
                left: 50,
                right: 50,
                bottom: 20,
                height: 100}
            }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    focused ?
                            <Ionicons name="home" size={size} color={color} />
                        :
                            <Ionicons name="home-outline" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name="NewExpense" component={NewExpense} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    focused ?
                            <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={50} color={color} />
                        :
                            <Ionicons name="add-circle-outline" size={50} color={color} />
                )
            }}/>
            <Tab.Screen name="Report" component={Report} options={{
                tabBarIcon: ({ color, size, focused }) => (
                    focused ?
                            <Ionicons name="document-text" size={size} color={color} />
                        :
                            <Ionicons name="document-text-outline" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;