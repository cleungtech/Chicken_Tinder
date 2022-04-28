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
    // console.log(user_info.user_type);
    // console.log(user_info.urgency);

    const default_url = "https://chicken-tinder-347213.uk.r.appspot.com/api";

    const [flock_url, set_flock_url] = useState(default_url);
    const [qr_value, set_qr_value] = useState("");

    // send fetch request to create the group

    // after getting the response, update the flock_url

    return (
      <SafeAreaView style={{alignItems: "center", marginTop: 50}}>
        <StatusBar style="auto" />
        <QRCode value={flock_url} />
        <Nav_Button
          button_name="Go See Restaurants" 
          route="Restaurants"
          nav_params={{}}
        />
      </SafeAreaView>
    );
}