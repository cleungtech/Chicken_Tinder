
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";
import * as Linking from 'expo-linking';
import { isMobile } from 'react-device-detect';
import {
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
const app_url = "exp://192.168.1.106:19000";

export function Login_Screen() {
  const [redirect_url, set_redirect_url] = useState(app_url);
  const [is_invited, set_is_invited] = useState(false);
  const [invitation, set_invitation] = useState({});
  const [user_name, set_user_name] = useState("");

  function redirect_to_mobile() {
    return Linking.openURL(redirect_url);
  }

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        const { flock_id, flock_name, host_name } = Linking.parse(url).queryParams;
        if (flock_id && flock_name && host_name) {
          set_invitation({
            flock_id: flock_id,
            flock_name: flock_name,
            host_name: host_name
          });
          set_is_invited(true);
        }
      });
  }, [])

  useEffect(() => {
    if (is_invited) {
      let url = redirect_url
      url = `${url}?flock_id=${invitation.flock_id}`;
      url = `${url}&flock_name=${invitation.flock_name}`;
      url = `${url}&host_name=${invitation.host_name}`;
      set_redirect_url(url);
    }
  }, [is_invited])

  return (
    <SafeAreaView style={styles.welcome_container}>
      <StatusBar style="auto" />
      <Image
        style={styles.placeholder}
        source={require("../../../assets/chicken_tinder_outline_white.png")}
      />
      {is_invited
        ?
        <Text>
          You have been invited by {invitation.host_name} to join {invitation.flock_name}!
        </Text>
        : null
      }
      <Credentials
        inputfield="Username"
        change_function={new_name => set_user_name(new_name)}
      />
      <Nav_Button
        disabled={!user_name}
        button_name="Get Started"
        route="Flock"
        nav_params={{
          user_name: user_name,
          flock_info: is_invited
            ? invitation
            : null
        }}
      />
      {isMobile
        ?
        <>
          <TouchableOpacity
            onPress={redirect_to_mobile}
            activeOpacity={0.5}
            style={styles.button}
          >
            <Text>Open Mobile App</Text>
          </TouchableOpacity>
        </>
        : null
      }
    </SafeAreaView>
  );
}