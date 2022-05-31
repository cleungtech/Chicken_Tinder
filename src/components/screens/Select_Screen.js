import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Nav_Button, Landing_Banner } from "../widgets/Buttons.js";
import { Credentials } from "../widgets/TextFields.js";
import styles from "../../styles/css.js";
import { auto_flock_name } from '../../constants.js';
import {
  Animated,
  Text,
  SafeAreaView,
  View
} from 'react-native';

const { auto_name_1, auto_name_2 } = auto_flock_name;

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
    <SafeAreaView style={styles.header_container}>
      <StatusBar style="auto" />
      <Landing_Banner />
      <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
        <View style={styles.container}>
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
        </View>
      </Animated.View>
    </SafeAreaView>
  )
}

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