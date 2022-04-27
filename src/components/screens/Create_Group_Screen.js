import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";

export function Create_Group_Screen({ route }) {
    const username = route.params.username;
    console.log(username);

    // make the fetch request here to create a user

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button 
          button_name="Create a Flock" 
          route="Select"
          nav_params={{
            username: username, 
            user_type: "host"}}
        />
        <Nav_Button
          button_name="Join a Room" 
          route="Join"
          nav_params={{
            username: username,
            user_type: "member"}}
        />
        <Useless_Button button_name="I'm Flying Solo" />
      </SafeAreaView>
    );
}