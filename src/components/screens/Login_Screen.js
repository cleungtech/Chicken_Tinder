
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  Image, 
  Text, 
  TextInput, 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";

export function Login_Screen() {
    const [username, set_username] = useState("");

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
          change_function={new_name => set_username(new_name)}
        />
        <Nav_Button 
          button_name="Get Started" 
          route="Create Group"
          nav_params={{username: username}}
        />
      </SafeAreaView>
    );
}

const Credentials = (props) => {
    return (
      <TextInput
        style={styles.credentials}
        placeholder={props.inputfield}
        onChangeText={props.change_function}
      />
    );
}
  