import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
  Image, 
  SafeAreaView,
  TouchableOpacity, 
  View, 
  Text, 
} from 'react-native';

import styles from "../../styles/css.js";

fake_data = [
        {
            "name": "test1",
            "rating": 10,
            "review_count": 100,
            "image_url": "image1.com"
        },
        {
            "name": "test2",
            "rating": 20,
            "review_count": 200,
            "image_url": "image2.com"
        },
        {
            "name": "test3",
            "rating": 30,
            "review_count": 300,
            "image_url": "image3.com"
        },
]

export function Restaurants_Screen() {
    const [current_index, set_current_index] = useState(0);
    const [current_shop, set_current_shop] = useState(fake_data[current_index]);

    useEffect(() => {
        set_current_shop(fake_data[current_index]);
    }, [current_index]);

    function advance_list() {
        if (current_index == 2) {
            // logic for determining winner goes here
            set_current_index(0);
        } else {
            set_current_index(current_index => current_index + 1);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <Restaurant_Card shop_data={current_shop} />
            <View style={styles.row}>
            <Vote_Button 
                button_name='dislike' 
                press_function={advance_list}
            />
            <Vote_Button 
                button_name='like' 
                press_function={advance_list}
            />
            </View>
        </SafeAreaView>
    )
}

function Restaurant_Card({shop_data}) {
    return (
        <View style={styles.card}>
            <Text>Name: {shop_data.name}</Text>
            <Text>Name: {shop_data.rating}</Text>
            <Text>Name: {shop_data.review_count}</Text>
            <Text>Name: {shop_data.image_url}</Text>
        </View>
    );
}

function Vote_Button({button_name, press_function}) {
    return (
      <TouchableOpacity
        onPress={press_function}
        style={styles.button}
        activeOpacity={0.5}
      >
        <Text>{button_name}</Text>
      </TouchableOpacity>
    );
  }
