import React, {FC} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "../screens/index2";
import { Login } from "../screens/index2";
import { Home } from "../screens/index2";

const {Navigator, Screen} = createStackNavigator();

export const AuthStack : FC = () =>{
    return  (
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="signup" component={SignUp}/>
            <Screen name="login" component={Login}/>
            <Screen name="home" component={Home}/>
        </Navigator>
    )
}

export default AuthStack;