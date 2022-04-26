import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";

import styles from "../../styles/css.js";

export function Select_Screen() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button button_name="We're Hangry NOW!" route="Create Group"/>
        <Useless_Button button_name="We're Hungry Later..."/>
      </SafeAreaView>
    )
}