import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { backend_api } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { Star_Rating } from "../widgets/Star_Rating";
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

  const navigation = useNavigation();

  const { user_info, flock_info } = route.params;
  const restaurants = flock_info.restaurants;

  const [current_index, set_current_index] = useState(0);
  const [current_shop, set_current_shop] = useState(restaurants[0]);

  const [network_error, set_network_error] = useState("");

  useEffect(() => {
    if (current_index < restaurants.length) {
      set_current_shop(restaurants[current_index]);
    } else {
      navigation.navigate("Result", {
        user_info: user_info,
        flock_info: flock_info
      })
    }
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
          set_current_index(current_index => current_index + 1);

        } else if (response.status === 400) {
          set_network_error("Provided vote info is invalid! Try again.");

        } else {
          set_network_error("Unable to process vote due to server error");
        }
      } catch (error) {
        console.error(error);
      }
    };

    vote_restaurant()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Restaurant_Card
        shop_data={current_shop}
      />
      <View style={styles.row}>
        <Vote_Button
          button_name="Dislike"
          press_function={() => advance_list(0)}
          image_path={image_paths.dislike}
        />
        <Vote_Button
          button_name="Like"
          press_function={() => advance_list(1)}
          image_path={image_paths.like}
        />
      </View>
    </SafeAreaView>
  )
}

function Restaurant_Card({ shop_data }) {
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
      <Star_Rating star_num={shop_data.rating} shop_id={shop_data.id}></Star_Rating>
      <Text>Review Count: {shop_data.review_count}</Text>
    </View>
  );
}

function Vote_Button({ button_name, press_function, image_path }) {
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