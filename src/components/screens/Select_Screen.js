import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";
import {
  Animated,
  Text,
  SafeAreaView
} from 'react-native';

export const Select_Screen = ({ route }) => {

  const user_info = route.params;
  const [flock_name, set_flock_name] = useState("");

  const fade_anim = useRef(new Animated.Value(0)).current;
  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
    }).start();
  }

  useEffect(() => {
    fade_in();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
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
      </Animated.View>
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