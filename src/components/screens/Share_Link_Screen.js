import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import * as Clipboard from 'expo-clipboard';
import { Nav_Button } from "../widgets/Buttons.js";
import QRCode from "react-qr-code";
import styles from "../../styles/css.js";
import * as Linking from "expo-linking";
import { Loading } from "../widgets/Loading"
import { backend_api, frontend_url } from '../../constants';
import {
  Animated,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from 'react-native';

export const Share_Link_Screen = ({ route }) => {

  const { user_info, flock_name, latitude, longitude } = route.params;
  const [join_url, set_join_url] = useState("");
  const [flock_res, set_flock_res] = useState({});
  const [url_is_loading, set_url_loading] = useState(true);
  const [network_error, set_network_error] = useState("");
  const [has_copied, set_has_copied] = useState({
    join_url: false,
    flock_id: false
  });

  const copy_join_url = () => {
    Clipboard.setString(join_url);
    set_has_copied({ join_url: true, flock_id: false });
  }

  const copy_flock_id = () => {
    Clipboard.setString(String(flock_res.flock_id));
    set_has_copied({ join_url: false, flock_id: true });
  }

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
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
            "latitude": parseFloat(latitude),
            "longitude": parseFloat(longitude),
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
        // console.log("");
        // console.log("---------------------------------------------");
        // console.log("POST request successful: ", response.status);
        // console.log("URL:", response.url);
        // console.log("flock_res: ", flock_res);
        // console.log("response.method: ", response.method);
        // console.log("response.headers: ", response.headers);
        // console.log("response.body: ", response.body);
        // console.log("---------------------------------------------");
      } else if (response.status === 400) {
        set_network_error("Unable to create a new flock due to invalid form");
        // console.log("");
        // console.log("---------------------------------------------");
        // console.log("Bad response:", response.status);
        // console.log("URL:", response.url);
        // console.log("flock_res: ", flock_res);
        // console.log("response.method: ", response.method);
        // console.log("response.headers: ", response.headers);
        // console.log("response.body: ", response.body);
        // console.log("---------------------------------------------");
      } else {
        set_network_error("Unable to create user due to server error");
        // console.log("");
        // console.log("---------------------------------------------");
        // console.log("Bad response:", response.status);
        // console.log("URL:", response.url);
        // console.log("flock_res: ", flock_res);
        // console.log("response.method: ", response.method);
        // console.log("response.headers: ", response.headers);
        // console.log("response.body: ", response.body);
        // console.log("---------------------------------------------");
      }
    } catch (error) {
      set_network_error("Fetch request failed. Check your CORS setting.");
      console.error(error);
      alert(error.toString());
    } finally {
      set_url_loading(false);
      fade_in();
    }
  };

  useEffect(() => {
    console.log(latitude);
    console.log(longitude);

    create_flock();
  }, []);

  useEffect(() => {
      let join_url = frontend_url;
      join_url = `${join_url}?flock_id=${flock_res.flock_id}`;
      join_url = `${join_url}&flock_name=${flock_name}`;
      join_url = `${join_url}&host_name=${user_info.user_name}`;
      set_join_url(join_url);
    }, [flock_res]);

  if (url_is_loading) return <Loading />
  return (
    <SafeAreaView style={{ alignItems: "center", marginTop: 50 }}>
      <StatusBar style="auto" />
      <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
        <Report_Status
          network_error={network_error}
          flock_name={flock_name}
        />
        <Share_QR_Code
          join_url={join_url}
          flock_res={flock_res}
        />
        <Share_Flock_Link
          join_url={join_url}
          flock_res={flock_res}
          has_copied={has_copied}
          copy_join_url={copy_join_url}
        />
        <Share_Flock_ID
          join_url={join_url}
          flock_res={flock_res}
          has_copied={has_copied}
          copy_flock_id={copy_flock_id}
        />
        <View_Restaurant_Button
          join_url={join_url}
          flock_res={flock_res}
          user_info={user_info}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const Report_Status = ({ network_error, flock_name }) => {
  if (network_error) return <Text>{network_error}</Text>
  return <Text>{flock_name} has been created successfully!</Text>
}

const Share_QR_Code = ({ join_url, flock_res }) => {
  if (!join_url || !flock_res.flock_id) return null;
  return (
    <>
      <Text>Scan QR code:</Text>
      <QRCode value={join_url} />
    </>
  )
}

const Share_Flock_Link = ({ join_url, flock_res, has_copied, copy_join_url }) => {
  if (!join_url || !flock_res.flock_id) return null;
  return (
    <>
      <TouchableOpacity onPress={copy_join_url}>
        <Text>Share Link: {has_copied.join_url ? "Copied!" : "Copy"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.credentials}
        value={join_url}
      />
    </>
  )
}

const Share_Flock_ID = ({ join_url, flock_res, has_copied, copy_flock_id }) => {
  if (!join_url || !flock_res.flock_id) return null;
  return (
    <>
      <TouchableOpacity onPress={copy_flock_id}>
        <Text>Share Flock ID: {has_copied.flock_id ? "Copied!" : "Copy"}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.credentials}
        value={String(flock_res.flock_id)}
      />
    </>
  )
}

const View_Restaurant_Button = ({ join_url, flock_res, user_info }) => {
  if (!join_url || !flock_res.flock_id) return null;
  return (
    <Nav_Button
      button_name="Go See Restaurants"
      route="Restaurants"
      nav_params={{
        user_info: user_info,
        flock_info: flock_res
      }}
    />
  )
}