import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import {
  Animated,
  ActivityIndicator,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Nav_Button } from "../models/Buttons.js";
import QRCode from "react-qr-code";
import styles from "../../styles/css.js";
import { chicken_colors } from "../../styles/css.js";

export function Share_Link_Screen({ route }) {
  const { user_info, flock_name } = route.params;

  const default_url = "https://chicken-tinder-347213.uk.r.appspot.com/api/";

  const [join_url, set_join_url] = useState("");
  const [flock_res, set_flock_res] = useState({});
  const [url_is_loading, set_url_loading] = useState(true);
  const [network_error, set_network_error] = useState("");
  const [has_copied_url, set_has_copied_url] = useState(false);
  const [has_copied_flock_id, set_has_copied_flock_id] = useState(false);

  const copy_url_to_clipboard = () => {
    Clipboard.setString(join_url);
    set_has_copied_flock_id(false);
    set_has_copied_url(true);
  }

  const copy_flock_id_to_clipboard = () => {
    Clipboard.setString(flock_res.flock_id);
    set_has_copied_url(false);
    set_has_copied_flock_id(true);
  }

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 2000,
    }).start();
  }

  const create_flock = async () => {
    try {
      const response = await fetch(
        `${default_url}flock`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "host_id": user_info.user_id,
          "flock_name": flock_name,
          "location": {
            "longitude": 40.4406,
            "latitude": -79.9959,
          }
        })
      });
      if (response.status === 201) {
        const json_res = await response.json();
        set_flock_res({
          flock_id: json_res.flock_id,
          host: json_res.host,
          flock_name: json_res.flock_name,
          location: json_res.location,
          restaurants: json_res.restaurants,
          self: json_res.self
        });
      } else if (response.status === 400) {
        set_network_error("Unable to create a new flock due to invalid form");
        alert(network_error);
      } else {
        set_network_error("Unable to create user due to server error");
        alert(network_error);
      }
    } catch (error) {
      console.error(error);
      alert(error.toString());
    } finally {
      set_url_loading(false);
      fade_in();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      create_flock();
    }, 0);
  }, []);

  useEffect(() => {
    if (Object.keys(flock_res).length) {
      let join_url = default_url;
      join_url += 'flock';
      join_url += `?flock_id=${flock_res.flock_id}`;
      join_url += `&flock_name=${flock_res.flock_name}`;
      join_url += `&host_name=${user_info.user_name}`;
      set_join_url(join_url);
    }
  }, [flock_res]);

  if (url_is_loading) {
    return (
      <SafeAreaView style={{alignItems: "center", marginTop: 50}}>
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
          <Text>{network_error}</Text>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={{alignItems: "center", marginTop: 50}}>
          <StatusBar style="auto" />
          <Animated.View style={
            [
              {opacity: fade_anim}
            ]
          }>
            <Text style={{color: 'black'}}>Flock Name: {flock_name}</Text>
            <Text style={{color: 'black'}}>3 Different ways to join</Text>
            
            <Text style={{color: 'black'}}>1. Scan QR code:</Text>
            <QRCode value={join_url} />

            <Text style={{color: 'black'}}>2. Share Link:</Text>
            <TouchableOpacity onPress={() =>
              copy_url_to_clipboard()}>
              <Text>
                {has_copied_url ? "Copied!" : join_url}
              </Text>
            </TouchableOpacity>

            <Text style={{color: 'black'}}>3. Share Flock ID:</Text>
            <TouchableOpacity onPress={() =>
              copy_flock_id_to_clipboard(flock_res.flock_id)}>
              <Text>
                {has_copied_flock_id ? "Copied!" : flock_res.flock_id}
              </Text>
            </TouchableOpacity>

            <Nav_Button
              button_name="Go See Restaurants" 
              route="Restaurants"
              nav_params={flock_res}
            />
          </Animated.View>
        </SafeAreaView>
      );
    }
  }
}