import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";

import styles from "../../styles/css.js";

export function Join_Screen({ route }) {

  const default_url = "https://chicken-tinder-347213.uk.r.appspot.com/api/";

  const { user_info, flock_info } = route.params;
  const invited = flock_info !== null;

  const [flock_id, set_flock_id] = useState(0);
  const [flock_res, set_flock_res] = useState({});
  const [joined, set_joined] = useState(false);
  const [error, set_error] = useState("");

  useEffect(() => {
    if (invited) set_flock_id(flock_info.flock_id);
  }, []);

  const join_flock = async () => {

    try {
      const response = await fetch(
        `${default_url}flock/${flock_id}/user/${user_info.user_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        const json_res = await response.json();
        set_flock_res({
          flock_id: json_res.flock_id,
          host: json_res.host,
          flock_name: json_res.flock_name,
          location: json_res.location,
          restaurants: json_res.restaurants,
          self: json_res.self
        });
        set_joined(true);
        set_error("");
      } else if (response.status === 400) {
        if (!joined) set_error("Provided Flock ID is invalid! Try again.");
      } else {
        if (!joined) set_error("Unable to join flock due to server error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {joined ? <Text>Successfully joined {flock_res.flock_name}</Text> : null}
      {error ? <Text>{error}</Text> : null}
      {joined
        ?
        <Nav_Button
          button_name="Go See Restaurants"
          route="Restaurants"
          nav_params={flock_res}
        />
        :
        <>
          <Credentials
            inputfield="Enter Flock ID Here"
            value={flock_id ? flock_id : ""}
            change_function={flock_id => set_flock_id(flock_id)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={join_flock}
            disabled={!flock_id}
          >
            <Text>Click here to join</Text>
          </TouchableOpacity>
        </>
      }
    </SafeAreaView>
  )
}