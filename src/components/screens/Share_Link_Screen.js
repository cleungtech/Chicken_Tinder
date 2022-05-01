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

    const default_url = "https://chicken-tinder-347213.uk.r.appspot.com/api";

    const [flock_url, set_flock_url] = useState("");
    const [flock_res, set_flock_res] = useState({
      flock_id: "",
      host: "",
      flock_name: "",
      location: {},
      users: []
    });
    const [is_loading, set_loading] = useState(true);

    // send fetch request to create the flock

    const create_flock = async () => {
      try {
        const response = await fetch(
          'https://chicken-tinder-347213.uk.r.appspot.com/api/flock', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "host_id": user_info.user_id,
            "flock_name": "test_flock",
            "location": {
              "longitude": 73.7781,
              "latitude": 40.6413,
            }
          })
          }
        );
        const json_res = await response.json();
        set_flock_res(json_res);
      } catch (error) {
        console.error(error);
      } finally {
        set_loading(false);
      }
    };

    useEffect(() => {
      create_flock();
    }, []);

    useEffect(() => {
      set_flock_url("https://chicken-tinder-347213.uk.r.appspot.com/api/flock/" + flock_res.flock_id);
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
          }}
        />
      </SafeAreaView>
    );
}