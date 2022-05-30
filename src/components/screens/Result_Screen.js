import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { backend_api } from '../../constants';
import { Nav_Button, Landing_Banner } from "../widgets/Buttons.js";
import { Star_Rating } from "../widgets/Star_Rating";
import { Display_Error } from "../widgets/Display_Error";
import { Loading } from "../widgets/Loading"
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

  const { user_info, flock_info } = route.params;
  const restaurants = flock_info.restaurants;

  const [url_is_loading, set_url_loading] = useState(true);
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
    console.log(most_voted_restaurants);
    console.log('here are the ratings');

    let highest_rated_restaurant = {};
    let highest_rating = 0;
    for (const id of most_voted_restaurants) {
      if (restaurant_ratings[id].rating > highest_rating) {
        highest_rated_restaurant = restaurant_ratings[id];
        highest_rating = restaurant_ratings[id].rating;
      }
    }

    console.log(highest_rated_restaurant);
    set_winner_data(highest_rated_restaurant);
  }

  const get_result = async () => {
    try {
      const response = await fetch(
        `${backend_api}flock/${flock_info.flock_id}/status`, {
        method: 'GET',
      });
      if (response.status === 200) {
        const json_res = await response.json();
        console.log('json_res');
        console.log(json_res);
        const highest_votes = json_res.most_voted_restaurants;
        find_winner(highest_votes);

      } else if (response.status === 400) {
        set_network_error("Unable to obtain winner due to invalid form");
      } else {
        set_network_error("Unable to obtain winner due to server error");
      }
    } catch (error) {
      set_network_error("Fetch request failed.");
      console.error(error);
    } finally {
      set_url_loading(false);
      fade_in();
    }
  };

  useEffect(() => {
    get_result();
  }, []);

  if (url_is_loading) return <Loading />
  if (network_error) return <Display_Error network_error={network_error} />
  return (
    <SafeAreaView style={styles.result_container}>
      <StatusBar style="auto" />
      <Winning_Card shop_data={winner_data} />
    </SafeAreaView>
  )
}

function Winning_Card({ shop_data }) {
  console.log(shop_data);

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
      {/* <Landing_Banner/> */}
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
