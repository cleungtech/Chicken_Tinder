
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

    const query_params = new URLSearchParams(window.location.search);
    const flock_id = query_params.get("flock_id");
    const flock_name = query_params.get("flock_name");
    const host_name = query_params.get("host_name");
    const invited = flock_id && flock_name && host_name;
    const [user_name, set_user_name] = useState("User");

    return (
      <SafeAreaView style={styles.welcome_container}>
        <StatusBar style="auto" />
        <Image
          style={styles.placeholder}
          source={require("../../../assets/chicken_tinder_outline_white.png")}
        />
        {invited
          ? <Text>
              You have been invited by {host_name} to join {flock_name}!
            </Text>
          : null}
        <Credentials 
          inputfield="Username"
          change_function={new_name => set_user_name(new_name)}
        />
        <Nav_Button 
          button_name="Get Started" 
          route="Flock"
          nav_params={{
            user_name: user_name,
            flock_info: invited 
              ? {
                flock_id: flock_id,
                flock_name: flock_name,
                host_name: host_name
              } : null
          }}
        />
      </SafeAreaView>
    );
}