import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login_Screen } from "./src/components/screens/Login_Screen.js"
import { Select_Screen } from "./src/components/screens/Select_Screen.js";
import { Flock_Screen } from "./src/components/screens/Flock_Screen.js";
import { Restaurants_Screen } from "./src/components/screens/Restaurants_Screen.js";
import { Share_Link_Screen } from "./src/components/screens/Share_Link_Screen.js";
import { Join_Screen } from "./src/components/screens/Join_Screen.js";
import { Result_Screen } from "./src/components/screens/Result_Screen.js";
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');
const Stack = createNativeStackNavigator();

export default function App() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Login_Screen: "login",
      }
    }
  }

  return (
    // <NavigationContainer linking={linking}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Result">
        <Stack.Screen name="Login" component={Login_Screen} />
        <Stack.Screen name="Select" component={Select_Screen} />
        <Stack.Screen name="Flock" component={Flock_Screen} />
        <Stack.Screen name="Restaurants" component={Restaurants_Screen} />
        <Stack.Screen name="Share Link" component={Share_Link_Screen} />
        <Stack.Screen name="Join" component={Join_Screen} />
        <Stack.Screen name="Result" component={Result_Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
