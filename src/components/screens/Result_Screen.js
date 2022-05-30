import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { backend_api } from '../../constants';
// import { useNavigation } from '@react-navigation/native';
import {
  Animated,
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Loading } from "../widgets/Loading";
import { Star_Rating } from "../widgets/Star_Rating";
import { Display_Error } from "../widgets/Display_Error";
import * as Linking from 'expo-linking';
import styles from "../../styles/css.js";

export function Result_Screen({ route }) {
  const { user_info, flock_info } = route.params;
  const restaurants = flock_info.restaurants;

  const [winner_id, set_winner_id] = useState("no winner");
  const [winner_data, set_winner_data] = useState({});
  const [url_is_loading, set_url_loading] = useState(true);
  const [network_error, set_network_error] = useState();

  const fade_anim = useRef(new Animated.Value(0)).current;

  const fade_in = () => {
    Animated.timing(fade_anim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 2000,
    }).start();
  }

  const find_winner = () => {
    for(const shop of restaurants) {
      if (shop.id == winner_id) {

        set_winner_data(shop);
      }
    }
  }
  
  const get_result = async () => {
    try {
      const response = await fetch(
        `${backend_api}flock/${flock_info.flock_id}/status`, {
        method: 'GET',
      });
      if (response.status === 200) {
        const json_res = await response.json();
        set_winner_id(json_res.most_voted_restaurants[0]);
        find_winner();
      } else if (response.status === 400) {
        set_network_error("Unable to obtain winner due to invalid form");
      } else {
        set_network_error("Unable to obtain winner due to server error");
      }
    } catch (error) {
      set_network_error("Fetch request failed");
      console.error(error);
    } finally {
      set_url_loading(false);
      fade_in();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      get_result();
    }, 0);
  }, []);

  useEffect(() => {
    find_winner();
  }, [winner_id]);

  if (url_is_loading) return <Loading />
  if (network_error) return <Display_Error network_error={network_error}/>
  else {
    return (
      <SafeAreaView style={styles.result_container}>
        <StatusBar style="auto" />
        <Winning_Card shop_data={winner_data} />
      </SafeAreaView>
    )
  }
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
    </View>
  );
}

