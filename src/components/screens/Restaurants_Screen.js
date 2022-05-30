import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { backend_api } from '../../constants';
import { Nav_Button } from "../models/Buttons.js";
import styles from "../../styles/css.js";
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

const image_paths = {
  dislike: require("../../../assets/dislike_icon.png"),
  like: require("../../../assets/like_icon.png"),
  unavailable: require("../../../assets/image_unavailable.png")
}

export function Restaurants_Screen({ route }) {

  const { user_info, flock_info } = route.params;
  const restaurants = flock_info.restaurants;

  const [current_index, set_current_index] = useState(0);
  const [current_shop, set_current_shop] = useState(restaurants[0]);

  const [network_error, set_network_error] = useState("");
  const [remaining_votes, set_remaining_votes] = useState(restaurants.length);

  useEffect(() => {
    if (current_index < restaurants.length)
      set_current_shop(restaurants[current_index]);
  }, [current_index]);

  function advance_list(vote_id) {
    const vote_restaurant = async () => {
      try {
        const response = await fetch(
          `${backend_api}flock/${flock_info.flock_id}/restaurant/${current_shop.id}/user/${user_info.user_id}?vote=${vote_id}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 204) {
          console.log("");
          console.log("---------------------------------------------");
          console.log("POST request successful: ", response.status);
          console.log("URL:", response.url);
          console.log("flock_info: ", flock_info.flock_name);
          console.log("response.method: ", response.method);
          console.log("response.headers: ", response.headers);
          console.log("response.body: ", response.body);
          console.log("---------------------------------------------");
          // const json_res = await response.json();
          set_remaining_votes(remaining_votes - 1);

        } else if (response.status === 400) {
          set_network_error("Provided vote info is invalid! Try again.");
          console.log("");
          console.log("---------------------------------------------");
          console.log("Bad response:", response.status);
          console.log("URL:", response.url);
          console.log("flock_info: ", flock_info.flock_name);
          console.log("response.method: ", response.method);
          console.log("response.headers: ", response.headers);
          console.log("response.body: ", response.body);
          console.log("---------------------------------------------");
        } else {
          set_network_error("Unable to process vote due to server error");
          console.log("");
          console.log("---------------------------------------------");
          console.log("Bad response:", response.status);
          console.log("URL:", response.url);
          console.log("flock_info: ", flock_info);
          console.log("response.method: ", response.method);
          console.log("response.headers: ", response.headers);
          console.log("response.body: ", response.body);
          console.log("---------------------------------------------");
        }
      } catch (error) {
        console.error(error);
      }
    };

    vote_restaurant()
    set_current_index(current_index => current_index + 1);
  }

  console.log("");
  console.log("*********************************************");
  console.log("RESTAURANTS_SCREEN");
  console.log("*********************************************");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Restaurant_Card
        shop_data={current_shop}
        remaining_votes={remaining_votes}
      />
      <View style={styles.row}>
        <Vote_Button
          button_name="Dislike"
          press_function={() => advance_list(0)}
          image_path={image_paths.dislike}
          remaining_votes={remaining_votes}
        />
        <Vote_Button
          button_name="Like"
          press_function={() => advance_list(1)}
          image_path={image_paths.like}
          remaining_votes={remaining_votes}
        />
        <View_Results_Button
          user_info={user_info}
          flock_info={flock_info}
          remaining_votes={remaining_votes}
        />
      </View>
    </SafeAreaView>
  )
}

function Restaurant_Card({ shop_data, remaining_votes }) {
  if (remaining_votes === 0) return null;
  const image_source = shop_data.image_url 
    ? { uri: shop_data.image_url }
    : image_paths.unavailable;
  return (
    <View style={styles.card}>
      <Image
        style={styles.image_rounded}
        source={image_source}
      />
      <Text>{shop_data.name}</Text>
      <Text>Rating: {shop_data.rating}</Text>
      <Text>Review Count: {shop_data.review_count}</Text>
    </View>
  );
}

function Vote_Button({ button_name, press_function, image_path, remaining_votes }) {
  if (remaining_votes === 0) return null;
  return (
    <TouchableOpacity
      onPress={press_function}
      style={styles.vote_button}
      activeOpacity={0.5}
    >
      <Text>{button_name}</Text>
      <Image
        style={styles.vote_icon}
        source={image_path}
      />
    </TouchableOpacity>
  );
}

const View_Results_Button = ({ user_info, flock_info, remaining_votes }) => {
  if (remaining_votes !== 0) return null;
  return (
    <Nav_Button
      button_name="View Results"
      route="Result"
      nav_params={{
        user_info: user_info,
        flock_info: flock_info
      }}
    />
  )
}