import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'; 
import * as Linking from 'expo-linking';

import styles from "../../styles/css.js";

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

  return (
    <SafeAreaView style={styles.result_container}>
      <StatusBar style="auto" />
      <Winning_Card shop_data={fake_data} />
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
      <Text>WINNER</Text>
      <Text>{shop_data.name}</Text>
      <Image
        style={styles.image_rounded}
        source={{ uri: shop_data.image_url }}
      />
      <Text>Rating: {shop_data.rating}</Text>
      <Text>Review Count: {shop_data.review_count}</Text>

      <TouchableOpacity
        onPress={() => go_to_maps(shop_data.coordinates)}
        style={styles.vote_button}
        activeOpacity={0.5}
      >
        <Text>Get Directions: </Text>
        <Text>{shop_data.location.display_address[0]}</Text>
        <Text>{shop_data.location.display_address[1]}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => go_to_phone(shop_data.phone)}
        style={styles.vote_button}
        activeOpacity={0.5}
      >
        <Text>Contact: </Text>
        <Text>{shop_data.display_phone}</Text>
      </TouchableOpacity>

    </View>
  );
}
