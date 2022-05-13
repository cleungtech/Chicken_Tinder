
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Image,
  Text,
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";

export function Login_Screen() {

  const [user_name, set_user_name] = useState("");

  return (
    <SafeAreaView style={styles.welcome_container}>
      <StatusBar style="auto" />
      <Image
        style={styles.placeholder}
        source={require("../../../assets/chicken_tinder_outline_white.png")}
      />
      <Credentials
        inputfield="Username"
        change_function={new_name => set_user_name(new_name)}
      />
      <Nav_Button
        disabled={!user_name}
        button_name="Get Started"
        route="Flock"
        nav_params={{
          user_name: user_name,
        }}
      />
    </SafeAreaView>
  );
}