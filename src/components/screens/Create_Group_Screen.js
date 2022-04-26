import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";

export function Create_Group_Screen() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button button_name="Share Link" route="Share Link"/>
        <Useless_Button button_name="Join a Room" />
        <Useless_Button button_name="I'm Flying Solo" />
        <Nav_Button button_name="Go See Restaurants" route="Restaurants"/>
      </SafeAreaView>
    );
  }