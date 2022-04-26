
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  Image, 
  Text, 
  TextInput, 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";

export function Login_Screen() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text>Login/Signup</Text>
        <Image
          style={styles.placeholder}
          source={require('../../../assets/tender.jpg')}
        />
        <Credentials inputfield="Username"/>
        <Credentials inputfield="Password"/>
        <Nav_Button button_name="Get Started" route="Select"/>
      </SafeAreaView>
    );
}

const Credentials = (props) => {
    return (
      <TextInput
        style={styles.credentials}
        placeholder={props.inputfield}
      />
    );
}
  