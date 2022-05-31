import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { backend_api } from '../../constants';
import { Nav_Button, Landing_Banner } from "../widgets/Buttons.js";
import { Star_Rating } from "../widgets/Star_Rating";
import { Display_Error } from "../widgets/Display_Error";
import { Loading } from "../widgets/Loading";
import * as Linking from 'expo-linking';
import styles from "../../styles/css.js";
import {
  Animated,
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export function Result_Screen({ route }) {

  const { flock_info } = route.params;
  const restaurants = flock_info.restaurants;

  const [interval_id, set_interval_id] = useState(null);
  const [is_waiting, set_is_waiting] = useState(true);
  const [network_error, set_network_error] = useState("");
  const [winner_data, set_winner_data] = useState({});

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 2000,
    }).start();
  }

  const find_winner = (most_voted_restaurants) => {
    const restaurant_ratings = Object.fromEntries(restaurants.map(r => {
      return [r.id, r];
    }));
    let highest_rated_restaurant = null;
    let highest_rating = 0;
    for (const id of most_voted_restaurants) {
      if (restaurant_ratings[id].rating > highest_rating) {
        highest_rated_restaurant = restaurant_ratings[id];
        highest_rating = restaurant_ratings[id].rating;
      }
    }
    set_winner_data(highest_rated_restaurant)
  }

  const get_result = async () => {
    try {
      const response = await fetch(
        `${backend_api}flock/${flock_info.flock_id}/status`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        const json_res = await response.json();
        if (json_res.remaining_votes === 0) {
          find_winner(json_res.most_voted_restaurants);
          set_is_waiting(false);
        }
      } else if (response.status === 400) {
        set_network_error("Unable to obtain winner due to invalid form");
      } else {
        set_network_error("Unable to obtain winner due to server error");
      }
    } catch (error) {
      set_network_error("Fetch request failed.");
      console.error(error);
      alert(error.toString());
    } finally {
      fade_in();
    }
  };

  useEffect(() => {
    if (is_waiting) {
      get_result();
      const interval_id = setInterval(get_result, 1000);
      set_interval_id(interval_id);
    } else {
      clearInterval(interval_id);
    }
  }, [is_waiting]);

  if (is_waiting) return <Loading message="Waiting for others..." />
  if (network_error) return <Display_Error network_error={network_error} />
  

  clearInterval(interval_id);
  return (
    <SafeAreaView style={styles.result_container}>
      <StatusBar style="auto" />
      <Winning_Card shop_data={winner_data} />
    </SafeAreaView>
  )
}

function Winning_Card({ shop_data }) {

  function go_to_maps(coords) {
    const map_url =
      "https://www.google.com/maps/dir/?api=1" +
      "&destination=" +
      coords.latitude +
      "," +
      coords.longitude;
    Linking.openURL(map_url);
  }

  function go_to_phone(telnum) {
    Linking.openURL('tel:' + telnum);
  }

  return (
    <SafeAreaView style={styles.header_container}>
    <View style={styles.results_card}>
      <Text style={styles.winner_name}>{shop_data.name}</Text>
      <Image
        style={styles.image_rounded}
        source={{ uri: shop_data.image_url }}
      />
      <Star_Rating star_num={shop_data.rating} shop_id={shop_data.id}></Star_Rating>
      <Text style={styles.winner_button_header}>
        Review Count: {shop_data.review_count}
      </Text>
      <TouchableOpacity
        onPress={() => go_to_maps(shop_data.coordinates)}
        style={styles.maps_button}
        activeOpacity={0.5}
      >
        <Text style={styles.winner_button_header}>Get Directions: </Text>
        <Text>{shop_data.location.display_address[0]}</Text>
        <Text>{shop_data.location.display_address[1]}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => go_to_phone(shop_data.phone)}
        style={styles.contact_button}
        activeOpacity={0.5}
      >
        <Text style={styles.winner_button_header}>Contact: </Text>
        <Text>{shop_data.display_phone}</Text>
      </TouchableOpacity>
      <Nav_Button
        button_name="Start Over"
        route="Login"
      />
    </View>
    </SafeAreaView>
  );
}
