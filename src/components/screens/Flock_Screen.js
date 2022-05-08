import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";

export function Flock_Screen({ route }) {

  const {user_name, flock_info} = route.params;
  const invited = flock_info !== null;

  const [user_res, set_user_res] = useState({});
  const [is_loading, set_loading] = useState(true);

  const create_user = async () => {
    try {
      const response = await fetch(
        "https://chicken-tinder-347213.uk.r.appspot.com/api/user", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_name": user_name,
        })
      });
      const json_res = await response.json();
      set_user_res(json_res);
    } catch (error) {
      console.error(error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    create_user();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {is_loading
        ? <Text>Creating user...</Text>
        : <>
            <Text>User {user_res.user_name} created!</Text>
            {invited
              ? null
              : <Nav_Button
                button_name="Create a Flock"
                route="Select"
                nav_params={user_res}
                />}
            <Nav_Button
              button_name={
                invited
                  ? `Join ${flock_info.flock_name} hosted by ${flock_info.host_name}`
                  : "Join a Flock"
              }
              route="Join"
              nav_params={{
                user_info: user_res,
                flock_info: flock_info
                }}
            />            
            {/* <Useless_Button button_name="I'm Flying Solo" /> */}
          </>}
    </SafeAreaView>
  );
}