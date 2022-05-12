import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { setString } from 'expo-clipboard';
import { Nav_Button } from "../models/Buttons.js";
import QRCode from "react-qr-code";
import styles from "../../styles/css.js";
import * as Linking from 'expo-linking';

const backend_api = "https://chicken-tinder-347213.uk.r.appspot.com/api/";
const web_app_url = "http://192.168.1.106:19006/"

export function Share_Link_Screen({ route }) {
  const { user_info, flock_name } = route.params;
  const [join_url, set_join_url] = useState("");
  const [flock_res, set_flock_res] = useState({
    flock_id: 0,
    host: 0,
    flock_name: "",
    location: {},
    restaurants: [],
    self: ""
  });
  const [url_is_loading, set_url_loading] = useState(true);
  const [error, set_error] = useState("");
  const [has_copied_url, set_has_copied_url] = useState(false);
  const [has_copied_flock_id, set_has_copied_flock_id] = useState(false);

  function copy_url_to_clipboard() {
    setString(join_url);
    set_has_copied_flock_id(false);
    set_has_copied_url(true);
  }

  function copy_flock_id_to_clipboard() {
    setString(String(flock_res.flock_id));
    set_has_copied_url(false);
    set_has_copied_flock_id(true);
  }

  const create_flock = async () => {
    try {
      const response = await fetch(
        `${backend_api}flock`, {
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
        set_error("");
      } else if (response.status === 400) {
        set_error("Unable to create a new flock due to invalid form");
      } else {
        set_error("Unable to create user due to server error");
      }
    } catch (error) {
      set_error("Fetch request failed. Check your CORS setting.");
      console.error(error);
    } finally {
      set_url_loading(false);
    }
  };

  useEffect(() => {
    create_flock();
  }, []);

  useEffect(() => {
    let url = web_app_url;
    url = `${url}?flock_id=${flock_res.flock_id}`;
    url = `${url}&flock_name=${flock_name}`;
    url = `${url}&host_name=${user_info.user_name}`;
    set_join_url(url);
  }, [flock_res]);

  return (
    <SafeAreaView style={{ alignItems: "center", marginTop: 50 }}>
      <StatusBar style="auto" />
      {error ? <Text>{error}</Text> : null}
      {url_is_loading ? <Text>Loading...</Text> : null}
      {join_url && flock_res.flock_id
        ?
        <>
          <Text>Flock Name: {flock_name}</Text>
          <Text>3 Different ways to join</Text>
          <Text>1. Scan QR code:</Text>
          <QRCode value={join_url} />
          <TouchableOpacity onPress={copy_url_to_clipboard}>
            <Text>2. Share Link: {has_copied_url ? "Copied!" : "Copy"}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.credentials}
            value={join_url}
          />
          <TouchableOpacity onPress={copy_flock_id_to_clipboard}>
            <Text>3. Share Flock ID: {has_copied_flock_id
              ? "Copied!"
              : "Copy"}
            </Text>
          </TouchableOpacity>
          <TextInput
            style={styles.credentials}
            value={String(flock_res.flock_id)}
          />
          <Nav_Button
            button_name="Go See Restaurants"
            route="Restaurants"
            nav_params={flock_res}
          />
        </>
        : null}
    </SafeAreaView>
  );
}