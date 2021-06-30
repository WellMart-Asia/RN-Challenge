import React, {FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/index2";
import { Dashboard } from "../screens/index2";
import { Done } from "../screens/index2";

const {Navigator, Screen} = createStackNavigator();

export const AppStack : FC = () =>{
    return  (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="home" component={Home}/>
            <Screen name="dashboard" component={Dashboard }/>
            <Screen name="done" component={Done}/>
        </Navigator>
    )
}

export default AppStack;