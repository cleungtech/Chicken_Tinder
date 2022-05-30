
import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Credentials } from "../widgets/TextFields.js";
import { Display_Error } from "../widgets/Display_Error";
import { Loading } from "../widgets/Loading";
import { Nav_Button } from "../widgets/Buttons.js";
import { backend_api } from '../../constants.js';

import styles from "../../styles/css.js";


export const Join_Screen = ({ route }) => {

  const { user_info, flock_info } = route.params;
  const invited = flock_info !== null;

  const [flock_id, set_flock_id] = useState(0);
  const [flock_res, set_flock_res] = useState({});
  const [joined, set_joined] = useState(false);
  const [network_error, set_network_error] = useState("");
  const [is_loading, set_loading] = useState(false);

  const join_flock = async () => {
    try {
      set_loading(true);
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
    } finally {
      set_loading(false);
    }
  };

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
  }

  useEffect(() => {
    if (invited) set_flock_id(flock_info.flock_id);
    fade_in();
  }, []);
  
  if (is_loading) return <Loading />
  if (network_error) return <Display_Error network_error={network_error}/>
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
      <Report_Status
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
        user_info={user_info}
      />
      </Animated.View>
    </SafeAreaView>
  )
}

const Report_Status = ({ joined, flock_res }) => {
  if (joined) {
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

const View_Restaurant_Button = ({ joined, flock_res, user_info }) => {
  if (!joined) return null;
  return (
    <Nav_Button
      button_name="Go See Restaurants"
      route="Restaurants"
      nav_params={{
        user_info: user_info,
        flock_info: flock_res
      }}
    />
  )
}