import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Nav_Button } from "../models/Buttons.js";
// import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";
import {
  Text,
  SafeAreaView,
} from 'react-native';

const backend_api = "https://chicken-tinder-347213.uk.r.appspot.com/api/";

export function Flock_Screen({ route }) {

  const { user_name, flock_info } = route.params;
  const invited = flock_info !== null;
  const [user_res, set_user_res] = useState({});
  const [is_loading, set_loading] = useState(true);
  const [network_error, set_network_error] = useState("");

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
      } else if (response.status === 400) {
        set_network_error("Unable to create a new user due to invalid form");
      } else {
        set_network_error("Unable to create user due to server error");
      }
    } catch (error) {
      set_network_error("Fetch request failed. Check your CORS setting.");
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
      <Alert_Message
        network_error={network_error}
        is_loading={is_loading}
        user_res={user_res}
      />
      <Create_Flock_Button
        show_button={!network_error}
        invited={invited}
        user_res={user_res}
      />
      <Join_Flock_Button
        show_button={!network_error}
        invited={invited}
        user_res={user_res}
        flock_info={flock_info}
      />
    </SafeAreaView>
  );
}

const Alert_Message = (props) => {
  const { network_error, is_loading, user_res } = props;
  if (network_error) {
    return <Text>{network_error}</Text>
  } else if (is_loading) {
    return <Text>Creating user...</Text>
  } else {
    return <Text>User {user_res.user_name} created!</Text>;
  }
}

const Create_Flock_Button = (props) => {
  const { show_button, invited, user_res } = props;
  if (invited || !show_button) return null;
  return (
    <Nav_Button
      button_name="Create a Flock"
      route="Select"
      nav_params={user_res}
    />
  );
}

const Join_Flock_Button = (props) => {
  const { show_button, invited, user_res, flock_info } = props; 
  if (!show_button) return null;
  let button_name = "Join a Flock";
  if (invited) {
    const { flock_name, host_name } = flock_info;
    button_name = `Join ${flock_name} hosted by ${host_name}`;
  }
  return (
    <Nav_Button
      button_name={button_name}
      route="Join"
      nav_params={{
        user_info: user_res,
        flock_info: flock_info
      }}
    />
  )
}