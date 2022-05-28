import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
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
import { backend_api } from '../constants.js';

const fake_data = {
  "id":"woXlprCuowrLJswWere3TQ",
  "alias":"täkō-pittsburgh-4",
  "name":"täkō",
  "image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/W2J52omHmHj54VA4aZffZw/o.jpg",
  "is_closed":false,
  "url":"https://www.yelp.com/biz/t%C3%A4k%C5%8D-pittsburgh-4?adjust_creative=4NyEZ_ADjDEi-lQ7QpfThw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=4NyEZ_ADjDEi-lQ7QpfThw",
  "review_count":1726,
  "categories":[
      {
          "alias":"newamerican",
          "title":"American (New)"
      },
      {
          "alias":"mexican",
          "title":"Mexican"
      }
  ],
  "rating":4.5,
  "coordinates":{
      "latitude":40.4422285652929,
      "longitude":-80.0019846968895
  },
  "transactions":[
      "restaurant_reservation"
  ],
  "price":"$$",
  "location":{
      "address1":"214 6th St",
      "address2":"",
      "address3":"",
      "city":"Pittsburgh",
      "zip_code":"15222",
      "country":"US",
      "state":"PA",
      "display_address":[
          "214 6th St",
          "Pittsburgh, PA 15222"
      ]
  },
  "phone":"+14124718256",
  "display_phone":"(412) 471-8256",
  "distance":545.8436859188364
}


export function Result_Screen({ route }) {
  const flock_info = route.params;
  const restaurants = flock_info.restaurants;

  const [winner, set_winner] = useState("");
  const [winner_data, set_winner_data] = useState({});
  const [url_is_loading, set_url_loading] = useState(true);
  const [network_error, set_network_error] = useState("");

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
      if (shop.id == winner) {
        set_winner_data(shop);
      }
    }
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
      if (response.status === 201) {
        const json_res = await response.json();
        set_winner(json_res.most_voted_restaurants[0]);
        find_winner();
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
      set_url_loading(false);
      fade_in();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      get_result();
    }, 0);
  }, []);

  if (url_is_loading) return <Loading />
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
