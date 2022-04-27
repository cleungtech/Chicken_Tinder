import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";

import styles from "../../styles/css.js";

export function Select_Screen({ route }) {
    const user_type = route.params.user_type
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button 
          button_name="We're Hangry NOW!" 
          route="Share Link"
          nav_params={{
            urgency: "now",
            user_type: user_type
          }}
        />
        <Nav_Button 
          button_name="We're Hungry Later..." 
          route="Share Link"
          nav_params={{
            urgency: "later",
            user_type: user_type
          }}
        />
      </SafeAreaView>
    )
}