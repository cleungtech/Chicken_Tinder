import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { 
  Text,
  Animated,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import { Useless_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";
import { chicken_colors } from "../../styles/css.js";

export function Flock_Screen({ route }) {
    const user_info = route.params;

    const [user_res, set_user_res] = useState({
      user_id: "",
      user_name: "",
      num_votes: -1,
    });
    const [is_loading, set_loading] = useState(true);

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
        fade_in();
      }
    };

    useEffect(() => {
      setTimeout(() => {
        create_user();
      }, 0);

      // clean the state
      return () => {
        set_user_res({ 
          user_id: "",
          user_name: "",
          num_votes: -1,
        });
      }
    }, []);

    if (is_loading) {
      return (
        <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text>Creating User...</Text>
        <ActivityIndicator 
          size="large" 
          color={chicken_colors.yellow}>
        </ActivityIndicator>
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
                user_name: user_info.user_name, 
                user_type: "host",
                user_id: user_res.user_id
              }}
            />
            <Nav_Button
              button_name="Join a Flock" 
              route="Join"
              nav_params={{
                user_name: user_info.user_name,
                user_type: "member",
                user_id: user_res.user_id
              }}
            />
            <Useless_Button button_name="I'm Flying Solo" />
          </Animated.View>
        </SafeAreaView>
      );
    }  
}