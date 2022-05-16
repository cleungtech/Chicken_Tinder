import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";
import {
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

const backend_api = "https://chicken-tinder-347213.uk.r.appspot.com/api/";

export const Join_Screen = ({ route }) => {

  const { user_info, flock_info } = route.params;
  const invited = flock_info !== null;

  const [flock_id, set_flock_id] = useState(0);
  const [flock_res, set_flock_res] = useState({});
  const [joined, set_joined] = useState(false);
  const [network_error, set_network_error] = useState("");

  useEffect(() => {
    if (invited) set_flock_id(flock_info.flock_id);
  }, []);

  const join_flock = async () => {
    try {
      const response = await fetch(
        `${backend_api}flock/${flock_id}/user/${user_info.user_id}`, {
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
        set_network_error("");
      } else if (response.status === 400 && !joined) {
        set_network_error("Provided Flock ID is invalid! Try again.");
      } else if (!joined) {
        set_network_error("Unable to join flock due to server error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Alert_Message
        network_error={network_error}
        joined={joined}
        flock_res={flock_res}
      />
      <Join_Flock_Form
        joined={joined}
        flock_id={flock_id}
        set_flock_id={set_flock_id}
        join_flock={join_flock}
      />
      <View_Restaurant_Button
        joined={joined}
        flock_res={flock_res}
      />
    </SafeAreaView>
  )
}

const Alert_Message = ({ network_error, joined, flock_res }) => {
  if (network_error) {
    return <Text>{network_error}</Text>
  } else if (joined) {
    return <Text>Successfully joined {flock_res.flock_name}</Text>
  } else {
    return <Text>Flock ID:</Text>;
  }
}

const Join_Flock_Form = ({ joined, flock_id, set_flock_id, join_flock }) => {
  if (joined) return null;
  return (
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
  )
}

const View_Restaurant_Button = ({ joined, flock_res }) => {
  if (!joined) return null;
  return (
    <Nav_Button
      button_name="Go See Restaurants"
      route="Restaurants"
      nav_params={flock_res}
    />
  )
}