import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisForm from "./src/screens/RegisForm";

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
      component={RegisForm}
      options={{ title:"Register Screen  "}}
      />
      <Stack.Screen
      name= "Profile"
      component={ProfileScreen}
      options={{ title:"Profile Screen  "}}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
