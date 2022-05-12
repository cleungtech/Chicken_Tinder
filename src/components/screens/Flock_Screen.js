import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
// import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";
const backend_api = "https://chicken-tinder-347213.uk.r.appspot.com/api/";

export function Flock_Screen({ route }) {

  const { user_name, flock_info } = route.params;
  const invited = flock_info !== null;
  const [user_res, set_user_res] = useState({});
  const [is_loading, set_loading] = useState(true);
  const [error, set_error] = useState("");

  const create_user = async () => {
    try {
      const response = await fetch(
        `${backend_api}user`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_name": user_name,
        })
      });
      if (response.status === 201) {
        const json_res = await response.json();
        set_user_res(json_res);
        set_error("");
      } else if (response.status === 400) {
        set_error("Unable to create a new user due to invalid form");
      } else {
        set_error("Unable to create user due to server error");
      }
    } catch (error) {
      set_error("Fetch request failed. Check your CORS setting.");
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
      {error ? <Text>{error}</Text> : null}
      {is_loading ? <Text>Creating user...</Text> : null}
      {!is_loading && !error
        ?
        <>
          <Text>User {user_res.user_name} created!</Text>
          {invited
            ? null
            :
            <Nav_Button
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
        </>
        : null
      }
    </SafeAreaView>
  );
}