
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Text, 
  TextInput, 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";

export function Login_Screen() {
    const [user_name, set_user_name] = useState("");

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text>Login/Signup</Text>
        <Image
          style={styles.placeholder}
          source={require('../../../assets/tender.jpg')}
        />
        <Credentials 
          inputfield="Username"
          change_function={new_name => set_user_name(new_name)}
        />
        <Nav_Button 
          button_name="Get Started" 
          route="Flock"
          nav_params={{user_name: user_name}}
        />
      </SafeAreaView>
    );
}