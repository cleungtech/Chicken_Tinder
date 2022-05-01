import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
    Text,
    SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";

import styles from "../../styles/css.js";

export function Join_Screen({ route }) {
    const user_info = route.params;
    const [flock_url, set_flock_url] = useState("");

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Credentials 
          inputfield="Enter Link Here"
          change_function={flock_url => set_flock_url(flock_url)}
        />
      </SafeAreaView>
    )
}