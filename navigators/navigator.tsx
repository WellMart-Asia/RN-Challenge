import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import CreateTask from '../screens/CreateTask';
import UpdateTask from '../screens/UpdateTask';

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="UpdateTask" component={UpdateTask} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator;