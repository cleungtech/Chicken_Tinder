import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { backend_api, frontend_url } from '../../constants';
// import { useNavigation } from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import styles from "../../styles/css.js";

const image_paths = {
  dislike: require("../../../assets/dislike_icon.png"),
  like: require("../../../assets/like_icon.png")
}

// const navigation = useNavigation();

export function Restaurants_Screen({ route }) {
  const { user_info, flock_info } = route.params;
  const restaurants = flock_info.restaurants;

  const [current_index, set_current_index] = useState(0);
  const [current_shop, set_current_shop] = useState(restaurants[0]);

  const [current_vote, set_current_vote] = useState(0);

  useEffect(() => {
    set_current_shop(restaurants[current_index]);
  }, [current_index]);

  const like_id = "1";
  const dislike_id = "0";

  function advance_list(vote_id) {
    const vote_restaurant = async () => {
      try {
        // set_loading(true);
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
        } else if (response.status === 400) {
          // set_network_error("Provided vote info is invalid! Try again.");
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
          // set_network_error("Unable to process vote due to server error");
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
      } finally {
        // set_loading(false);
        // fade_in();
      }
    };

    vote_restaurant()

    if (current_index == 9) {
      // logic for determining winner goes here
      set_current_index(0);
      // navigation.navigate(route, {{user_info: user_info, flock_info: flock_info}});
    } else {
      set_current_index(current_index => current_index + 1);
    }
  }

  console.log("");
  console.log("*********************************************");
  console.log("RESTAURANTS_SCREEN");
  console.log("*********************************************");
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Restaurant_Card shop_data={current_shop} />
      <View style={styles.row}>
        <Vote_Button
          button_name="Dislike"
          vote_id = "0"
          press_function={advance_list}
          image_path={image_paths.dislike}
        />
        <Vote_Button
          button_name="Like"
          vote_id = "1"
          press_function={advance_list}
          image_path={image_paths.like}
          
        />
      </View>
    </SafeAreaView>
  )
}

function Restaurant_Card({ shop_data }) {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image_rounded}
        source={{ uri: shop_data.image_url }}
      />
      <Text>{shop_data.name}</Text>
      <Text>Rating: {shop_data.rating}</Text>
      <Text>Review Count: {shop_data.review_count}</Text>
    </View>
  );
}

function Vote_Button({ button_name, press_function, image_path, vote_id }) {
  // let vote_id = {vote_id};
  return (
    <TouchableOpacity
      // onPress={() => this.advance_list(vote_id)}
      // onPress={function(){ return press_function(vote_id); }}
      onPress={() => press_function(vote_id)}
      // onPress={press_function}
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

