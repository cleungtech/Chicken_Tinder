import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
// import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";
import { chicken_colors } from "../../styles/css.js";

export function Flock_Screen({ route }) {

  const { user_name, flock_info } = route.params;

  const [user_res, set_user_res] = useState({});
  const [is_loading, set_loading] = useState(true);
  const [network_error, set_network_error] = useState("");

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
    }).start();
  }

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
      if (response.status === 201) {
        const json_res = await response.json();
        set_user_res(json_res);
      } else if (response.status === 400) {
        set_network_error("Unable to create a new user due to invalid form");
        alert(network_error);
      } else {
        set_network_error("Unable to create user due to server error");
        alert(network_error);
      }
    } catch (error) {
      console.error(error);
      alert(error.toString())
    } finally {
      set_loading(false);
      fade_in();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      create_user();
    }, 0);

    // clean the state
    return () => {
      set_user_res({});
    }
  }, []);

  if (is_loading) {
    return (
      <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ActivityIndicator 
        size="large" 
        color={chicken_colors.yellow}>
      </ActivityIndicator>
    </SafeAreaView>
    );
  } else {
    if (network_error) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          {/* replace this with an icon or something later */}
          <Image
            style={styles.placeholder}
            source={require("../../../assets/tender.jpg")}
          />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <Animated.View style={
            [
              {opacity: fade_anim}
            ]
          }>
            <Nav_Button 
              button_name="Create a Flock" 
              route="Select"
              nav_params={{
                user_name: user_name, 
                user_type: "host",
                user_id: user_res.user_id
              }}
            />
            <Nav_Button
              button_name="Join a Flock" 
              route="Join"
              nav_params={{
                user_name: user_name,
                user_type: "member",
                user_id: user_res.user_id
              }}
            />
            {/* <Useless_Button button_name="I'm Flying Solo" /> */}
          </Animated.View>
        </SafeAreaView>
      );
    }
  }   
}