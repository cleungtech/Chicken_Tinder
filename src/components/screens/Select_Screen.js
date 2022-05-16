import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";
import {
  Text,
  SafeAreaView
} from 'react-native';

export const Select_Screen = ({ route }) => {

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
      <Create_Flock_Button
        button_name="We're Hungry NOW!"
        user_info={user_info}
        flock_name={flock_name}
      />
      {/* <Create_Flock_Button
        button_name="We're Hungry Later..."
        user_info={user_info}
        flock_name={flock_name}
      /> */}
    </SafeAreaView>
  )
}

const Create_Flock_Button = ({ button_name, user_info, flock_name }) => {
  return (
    <Nav_Button
      button_name={button_name}
      route="Share Link"
      disabled={!flock_name}
      nav_params={{
        user_info: user_info,
        flock_name: flock_name
      }}
    />
  )
}