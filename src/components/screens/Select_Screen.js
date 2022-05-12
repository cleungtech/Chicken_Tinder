import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text,
  SafeAreaView
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";

import styles from "../../styles/css.js";

export function Select_Screen({ route }) {

  const user_info = route.params;
  const [flock_name, set_flock_name] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Flock Name:</Text>
      <Credentials
        inputfield="Enter a flock name here"
        change_function={new_flock => set_flock_name(new_flock)}
      />
      <Nav_Button
        button_name="We're Hungry NOW!"
        route="Share Link"
        disabled={!flock_name}
        nav_params={{
          user_info: user_info,
          flock_name: flock_name
        }}
      />
      {/* <Nav_Button 
          button_name="We're Hungry Later..." 
          route="Share Link"
          nav_params={{
            user_info: user_info,
            flock_name: flock_name
          }}
        /> */}
    </SafeAreaView>
  )
}