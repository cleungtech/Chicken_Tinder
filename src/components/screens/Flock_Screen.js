import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";

export function Flock_Screen({ route }) {
    const user_info = route.params;

    const [user_res, set_user_res] = useState({
      user_id: "",
      user_name: "",
      num_votes: -1,
    });
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
            "user_name": user_info.user_name,
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

    // need to handle situation where the data has not loaded yet from async
    // call and should display loading circle instead

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Nav_Button 
          button_name="Create a Flock" 
          route="Select"
          nav_params={{
            user_name: user_info.user_name, 
            user_type: "host",
            user_id: user_res.user_id
          }}
        />
        <Nav_Button
          button_name="Join a Room" 
          route="Join"
          nav_params={{
            user_name: user_info.user_name,
            user_type: "member",
            user_id: user_res.user_id
          }}
        />
        <Useless_Button button_name="I'm Flying Solo" />
      </SafeAreaView>
    );
}