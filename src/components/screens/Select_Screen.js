import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";

import styles from "../../styles/css.js";

export function Select_Screen({ route }) {
    const user_type = route.params.user_type;
    const username = route.params.username;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button 
          button_name="We're Hangry NOW!" 
          route="Share Link"
          nav_params={{
            username: username,
            user_type: user_type,
            urgency: "now",
            
          }}
        />
        <Nav_Button 
          button_name="We're Hungry Later..." 
          route="Share Link"
          nav_params={{
            username: username,
            user_type: user_type,
            urgency: "later",
          }}
        />
      </SafeAreaView>
    )
}