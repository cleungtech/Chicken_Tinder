import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Credentials } from "../widgets/TextFields.js";
import { Nav_Button } from "../widgets/Buttons.js";

import styles from "../../styles/css.js";


export const Select_Screen = ({ route }) => {

  const user_info = route.params;
  const [flock_name, set_flock_name] = useState("");

  const fade_anim = useRef(new Animated.Value(0)).current;
  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
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
        <Text style={styles.note_text_black}>
          If left empty, one will be chosen for you
        </Text>
        <Create_Flock_Button
          button_name="Create Flock"
          user_info={user_info}
          flock_name={flock_name}
          auto_name_1={auto_name_1}
          auto_name_2={auto_name_2}
        />
      </Animated.View>
    </SafeAreaView>
  )
}

const auto_name_1 = ["rutabaga", "pasticcio", "biryani", "tonkatsu", "tofu", "gruyere", "zongzi", "kimbap", "bratwurst", "potato"];
const auto_name_2 = ["farmers", "grocers", "chefs", "munchers", "eaters", "sellers", "crunchers", "friends", "family", "platoon"];

const Create_Flock_Button = ({ button_name, user_info, flock_name }) => {
  if (!flock_name) {
    flock_name = "the_" + auto_name_1[Math.floor(Math.random() * auto_name_1.length)] + "_" + auto_name_2[Math.floor(Math.random() * auto_name_2.length)]
  }

  return (
    <Nav_Button
      button_name={button_name}
      route="Request Location"
      nav_params={{
        user_info: user_info,
        flock_name: flock_name
      }}
    />
  )
}