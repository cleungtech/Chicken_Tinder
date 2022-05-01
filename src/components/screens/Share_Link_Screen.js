import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  Text,
  SafeAreaView,
} from 'react-native';

import { Nav_Button } from "../models/Buttons.js";
import QRCode from "react-qr-code";

export function Share_Link_Screen({ route }) {
    const user_info = route.params;

    const default_url = "https://chicken-tinder-347213.uk.r.appspot.com/api/";

    const [flock_url, set_flock_url] = useState("");
    const [flock_res, set_flock_res] = useState({
      flock_id: user_info.user_id,
      host: user_info.user_id,
      flock_name: user_info.flock_name,
      location: {},
      users: []
    });
    const [url_is_loading, set_url_loading] = useState(true);

    const create_flock = async () => {
      try {
        const response = await fetch(
          default_url + "flock", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "host_id": user_info.user_id,
            "flock_name": user_info.flock_name,
            "location": {
              "longitude": 40.4406,
              "latitude": -79.9959,
            }
          })
          }
        );
        const json_res = await response.json();
        set_flock_res(json_res);
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
      set_flock_url("" + flock_res.self);
    }, [flock_res]);

    return (
      <SafeAreaView style={{alignItems: "center", marginTop: 50}}>
        <StatusBar style="auto" />
        <QRCode value={flock_url} />
        <Text>{flock_url}</Text>
        <Nav_Button
          button_name="Go See Restaurants" 
          route="Restaurants"
          nav_params={{
            flock_name: flock_res.flock_name,
            flock_id: flock_res.flock_id,
            host: flock_res.host,
            restaurants: flock_res.restaurants,
          }}
        />
      </SafeAreaView>
    );
}