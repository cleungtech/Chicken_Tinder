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

const image_paths = {
    dislike: require("../../../assets/dislike_icon.png"),
    like: require("../../../assets/like_icon.png")
}

export function Restaurants_Screen({ route }) {
    const flock_info = route.params;
    const restaurants = flock_info.restaurants;

    const [current_index, set_current_index] = useState(0);
    const [current_shop, set_current_shop] = useState(restaurants[0]);

    useEffect(() => {
        set_current_shop(restaurants[current_index]);
    }, [current_index]);

    function advance_list() {
        if (current_index == 9) {
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
                button_name="Dislike"
                press_function={advance_list}
                image_path={image_paths.dislike}
            />
            <Vote_Button 
                button_name="Like" 
                press_function={advance_list}
                image_path={image_paths.like}
            />
            </View>
        </SafeAreaView>
    )
}

function Restaurant_Card({shop_data}) {
    return (
        <View style={styles.card}>
            <Image
                style={styles.image_rounded}
                source={{uri: shop_data.image_url}}
            />
            <Text>{shop_data.name}</Text>
            <Text>Rating: {shop_data.rating}</Text>
            <Text>Review Count: {shop_data.review_count}</Text>
        </View>
    );
}

function Vote_Button({button_name, press_function, image_path}) {
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

