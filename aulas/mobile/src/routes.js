import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const AppStack = createStackNavigator();

import Incidents from './pages/Incidents/Index';
import Detail from './pages/Detail/Index';

 export default function Routes(){
     return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false}}>
                <AppStack.Screen name='incidents' component={Incidents} />
                <AppStack.Screen name='detail' component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
     );
 }