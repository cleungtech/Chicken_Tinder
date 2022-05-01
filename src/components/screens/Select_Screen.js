import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";

import styles from "../../styles/css.js";

export function Select_Screen({ route }) {
    const user_info = route.params;

    console.log("new user info below:");
    console.log("username: " + user_info.user_name)
    console.log("user_id: " + user_info.user_id);

    // textfield for flock name here


    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button 
          button_name="We're Hangry NOW!" 
          route="Share Link"
          nav_params={{
            user_name: user_info.user_name,
            user_id: user_info.user_id,
            user_type: user_info.user_type,
            urgency: "now",
          }}
        />
        <Nav_Button 
          button_name="We're Hungry Later..." 
          route="Share Link"
          nav_params={{
            user_name: user_info.user_name,
            user_id: user_info.ser_id,
            user_type: user_info.user_type,
            urgency: "later",
          }}
        />
      </SafeAreaView>
    )
}