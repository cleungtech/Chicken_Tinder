
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

export const Login_Screen = () => {

  const [user_name, set_user_name] = useState("");
  const [redirect_url, set_redirect_url] = useState("");
  const [is_invited, set_is_invited] = useState(false);
  const [invitation, set_invitation] = useState({
    flock_id: 0,
    flock_name: "",
    host_name: ""
  });
  
  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        const initial_url = Linking.parse(url);
        set_redirect_url(`exp://${initial_url.hostname}:19000`);
        const { flock_id, flock_name, host_name } = initial_url.queryParams;
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
      let url = redirect_url;
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
      <Invited_Message
        is_invited={is_invited}
        host_name={invitation.host_name}
        flock_name={invitation.flock_name}
      />
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
          flock_info: is_invited ? invitation : null
        }}
      />
      <Mobile_Redirection_Button
        is_mobile={isMobile}
        handler={() => Linking.openURL(redirect_url)}
      />
    </SafeAreaView>
  );
}

const Invited_Message = (props) => {
  const { is_invited, host_name, flock_name } = props;
  if (!is_invited) return null;
  return (
    <Text>
      You have been invited by {host_name} to join {flock_name}!
    </Text>
  )
}

const Mobile_Redirection_Button = (props) => {
  const { is_mobile, handler } = props;
  if (!is_mobile) return null;
  return (
    <TouchableOpacity
      onPress={handler}
      activeOpacity={0.5}
      style={styles.button}
    >
      <Text>Open Mobile App</Text>
    </TouchableOpacity>
  )
}