
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";
import * as Linking from 'expo-linking';
import { isMobile } from 'react-device-detect';
import {
  Animated,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

export const Login_Screen = () => {

  const [user_name, set_user_name] = useState("");
  const [redirect_url, set_redirect_url] = useState("");
  const [is_invited, set_is_invited] = useState(false);
  const [invitation, set_invitation] = useState({});

  useEffect(() => {
    Linking.parseInitialURLAsync().then(parsedURL => {
      set_redirect_url(`exp://${parsedURL.hostname}:19000`);
      if (parsedURL.queryParams) {
        const { flock_id, flock_name, host_name } = parsedURL.queryParams;
        if (flock_id && flock_name && host_name) {
          set_invitation({
            flock_id: flock_id,
            flock_name: flock_name,
            host_name: host_name
          });
          set_is_invited(true);
      }
      }
    })
    fade_in();
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

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 1000,
    }).start();
  }

  return (
    <SafeAreaView style={styles.welcome_container}>
      <StatusBar style="auto" />
      <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
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
        <Get_Started_Button
          user_name={user_name}
          is_invited={is_invited}
          invitation={invitation}
        />
        <Mobile_Redirection_Button
          is_mobile={isMobile}
          handler={() => Linking.openURL(redirect_url)}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const Get_Started_Button = ({ user_name, is_invited, invitation }) => {
  return (
    <Nav_Button
      disabled={!user_name}
      button_name="Get Started"
      route="Flock"
      nav_params={{
        user_name: user_name,
        flock_info: is_invited ? invitation : null
      }}
    />
  )
}

const Invited_Message = ({ is_invited, host_name, flock_name }) => {
  if (!is_invited) return null;
  return (
    <Text>
      You have been invited by {host_name} to join {flock_name}!
    </Text>
  )
}

const Mobile_Redirection_Button = ({ is_mobile, handler }) => {
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