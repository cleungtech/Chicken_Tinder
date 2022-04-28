import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";

export function Create_Group_Screen({ route }) {
    const username = route.params.username;

    const [user_res, set_user_res] = useState({});
    const [is_loading, set_loading] = useState(true);

    const create_user = async () => {
      try {
        const response = await fetch(
          'https://chicken-tinder-347213.uk.r.appspot.com/api/user', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "user_name": username,
          })
          }
        );
        const json_res = await response.json();
        set_user_res(json_res)
      } catch (error) {
        console.error(error);
      } finally {
        set_loading(false);
      }
    };

    useEffect(() => {
      create_user();
    }, []);

    // need to disable the nav buttons until the user_res is finished loading
    // look into the disabled property for touchable opacity

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button 
          button_name="Create a Flock" 
          route="Select"
          nav_params={{
            username: username, 
            user_type: "host",
            user_id: user_res.user_id
          }}
        />
        <Nav_Button
          button_name="Join a Room" 
          route="Join"
          nav_params={{
            username: username,
            user_type: "member",
            user_id: user_res.user_id
          }}
        />
        <Useless_Button button_name="I'm Flying Solo" />
      </SafeAreaView>
    );
}