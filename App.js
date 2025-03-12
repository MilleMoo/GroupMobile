import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./scr/screens/HomeScreen";
import LoginScreen from "./scr/screens/LoginScreen";
import RegisterScreen from "./scr/screens/RegisterScreen";

const Stack = createStackNavigator()

const App = ()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
      name= "Home"
      component={HomeScreen}
      options={{ title:"Home Screen  "}}
      />
      <Stack.Screen
      name= "Login"
      component={LoginScreen}
      options={{ title:"Login Screen  "}}
      />
      <Stack.Screen
      name= "Register"
      component={RegisterScreen}
      options={{ title:"Register Screen  "}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
