import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
    Text,
    SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";

import styles from "../../styles/css.js";

export function Join_Screen({ route }) {
    const user_info = route.params;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text>Create a textfield to enter join room link</Text>
      </SafeAreaView>
    )
}