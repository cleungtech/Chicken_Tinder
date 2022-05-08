import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Nav_Button } from "../models/Buttons.js";
import QRCode from "react-qr-code";

import styles from "../../styles/css.js";

export function Share_Link_Screen({ route }) {

  const {user_info, flock_name} = route.params;
  const default_url = "https://chicken-tinder-347213.uk.r.appspot.com/api/";
  const app_url = window.location.host;

  const [join_url, set_join_url] = useState("");
  const [flock_res, set_flock_res] = useState({});

  const [url_is_loading, set_url_loading] = useState(true);
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
      const json_res = await response.json();
      set_flock_res({
        flock_id: json_res.flock_id,
        host: json_res.host,
        flock_name: json_res.flock_name,
        location: json_res.location,
        restaurants: json_res.restaurants,
        self: json_res.self
      });
    } catch (error) {
      console.error(error);
    } finally {
      set_url_loading(false);
    }
  };

  useEffect(() => {
    create_flock();
  }, []);

  useEffect(() => {
    let join_url = app_url;
    join_url += `?flock_id=${flock_res.flock_id}`;
    join_url += `&flock_name=${flock_res.flock_name}`
    join_url += `&host_name=${user_info.user_name}`
    set_join_url(join_url);
  }, [flock_res]);

  return (
    <SafeAreaView style={{ alignItems: "center", marginTop: 50 }}>
      <StatusBar style="auto" />
      {url_is_loading
        ? <Text>"Loading..."</Text>
        : <>
          <Text>Flock Name: {user_info.flock_name}</Text>
          <Text>3 Different ways to join</Text>
          <Text>1. Scan QR code:</Text>
          <QRCode value={join_url} />

          <Text>2. Share Link:</Text>
          <TouchableOpacity onPress={() =>
            copy_url_to_clipboard()}>
            <TextInput
              style={styles.credentials}
              value={has_copied_url ? "Copied!" : join_url}
            />
          </TouchableOpacity>

          <Text>3. Share Flock ID:</Text>
          <TouchableOpacity onPress={() =>
            copy_flock_id_to_clipboard(flock_res.flock_id)}>
            <TextInput
              style={styles.credentials}
              value={has_copied_flock_id 
                ? "Copied!" 
                : flock_res.flock_id}
            />
          </TouchableOpacity>
        </>}

      <Nav_Button
        button_name="Go See Restaurants"
        route="Restaurants"
        nav_params={flock_res}
      />
    </SafeAreaView>
  );
}