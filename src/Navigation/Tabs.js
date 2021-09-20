import React from 'react';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NewExpense from '../Screens/NewExpense';
import Report from '../Screens/Report';
import Home from '../Screens/Home';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Report" component={Report}/>
            <Tab.Screen name="NewExpense" component={NewExpense}/>
        </Tab.Navigator>
    )
}

export default Tabs;