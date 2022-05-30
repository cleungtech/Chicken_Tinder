import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { backend_api, frontend_url } from '../../constants';
// import { useNavigation } from '@react-navigation/native';
import { Loading } from "../models/Loading";
import {
  Animated,
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Display_Error } from "../models/Network_Error";
import { Star_Rating } from "../models/Star_Rating";
import * as Linking from 'expo-linking';
import styles from "../../styles/css.js";


export function Result_Screen({ route }) {

  const { user_info, flock_info } = route.params;
  const restaurants = flock_info.restaurants;

  const [is_waiting, set_is_waiting] = useState(true);

  const [network_error, set_network_error] = useState("");

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 2000,
    }).start();
  }

  // const find_winner = (most_voted_restaurants) => {
  //   console.log("find_winner");
  //   console.log(most_voted_restaurants);
  //   let highest_rated_restaurant = null;

  //   for (r in most_voted_restaurants) {
  //     console.log(r);
  //   }
  // }
  
  const get_result = async () => {
    try {
      console.log("Fetching");
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

        if (json_res.remaining_votes === 0)
          find_winner(json_res.most_voted_restaurants);

      } else if (response.status === 400) {
        set_network_error("Unable to create a new flock due to invalid form");
      } else {
        set_network_error("Unable to create user due to server error");
      }
    } catch (error) {
      set_network_error("Fetch request failed. Check your CORS setting.");
      console.error(error);
      alert(error.toString());
    } finally {
      fade_in();
    }
  };

  useEffect(() => {
    get_result();
  }, []);

  if (is_waiting) {
    return (
      <Loading
        message="Waiting for others..."
      />
    )
  }

  return (
    <SafeAreaView style={styles.result_container}>
      <StatusBar style="auto" />
      <Text>Result Screen</Text>
      {/* <Winning_Card shop_data={winner_data} /> */}
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
    <View style={styles.card}>
      <Text style={styles.winner_name}>{shop_data.name}</Text>
      <Image
        style={styles.image_rounded}
        source={{ uri: shop_data.image_url }}
      />
      <Star_Rating star_num={shop_data.rating}></Star_Rating>
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
    </View>
  );
}

