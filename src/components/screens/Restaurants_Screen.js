import React, {Component} from 'react';
import { 
  Image, 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  Dimensions,
  Animated
} from 'react-native';

import { Found_Restaurants } from 
        "./src/components/models/Found_Restuarants"


class Restaurants_Screen extends Component{
    // hard-coded list of restaurant cards
    fake_data = { 
        "businesses": [
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
    }

    nearby_shops = Found_Restaurants(fake_data)

    constructor(props) {
        this.state = {
            gesture_name: 'None',
            current_restaurant: nearby_shops[0]
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Nothing to see here</Text>

            </View>
        );
    }

    renderCards = () => {
        return nearby_shops.map((item, i) => {
            return (
                <Animated.View
                    style={{
                    height: 100,
                    width: 100,
                    padding: 10
                    }}
                >
                    <Image
                    style={{
                        flex: 1,
                        height: null,
                        width: null,
                        resizeMode: "cover",
                        borderRadius: 20
                    }}
                    source={item.uri}
                    />
                </Animated.View>
            );
        });
    }
}

function Vote_Button({button_name}) {
    return (
      <TouchableOpacity
        onPress={() => alert("Not Implemented Yet!")}
        style={styles.button}
        activeOpacity={0.5}
      >
        <Text>{button_name}</Text>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { Restaurants_Screen };