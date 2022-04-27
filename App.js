import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login_Screen } from "./src/components/screens/Login_Screen.js"
import { Select_Screen } from "./src/components/screens/Select_Screen.js";
import { Create_Group_Screen } from "./src/components/screens/Create_Group_Screen.js";
import { Restaurants_Screen } from "./src/components/screens/Restaurants_Screen.js";
import { Share_Link_Screen } from "./src/components/screens/Share_Link_Screen.js";
import { Join_Screen } from "./src/components/screens/Join_Screen.js";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login_Screen} />
        <Stack.Screen name="Select" component={Select_Screen} />
        <Stack.Screen name="Create Group" component={Create_Group_Screen} />
        <Stack.Screen name="Restaurants" component={Restaurants_Screen} />
        <Stack.Screen name="Share Link" component={Share_Link_Screen} />
        <Stack.Screen name="Join" component={Join_Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}