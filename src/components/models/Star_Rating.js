import styles from "../../styles/css.js";
import {
    View,
  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { chicken_colors } from "../../styles/css.js";

export const Star_Rating = ({star_num}) => {
    const star_arr = [];
    for (let i = 0; i < 5; i++) {
        star_arr.push(
            <FontAwesome 
                name="star-o" 
                size={24} 
                color={chicken_colors.yellow_light} 
            />
        );
    } 

    const star_remainder = star_num % 1;
    const star_whole = Math.trunc(star_num);

    if (star_remainder > 0) {
        star_arr.pop();
        star_arr.unshift(
            <FontAwesome 
                name="star-half-o" 
                size={24} 
                color={chicken_colors.yellow_light} 
            />
        );
    }

    for (let i = 0; i < star_whole; i++) {
        star_arr.pop();
        star_arr.unshift(
            <FontAwesome 
                name="star" 
                size={24} 
                color={chicken_colors.yellow_light} 
            />
        );
    } 

    return (
        <View style={styles.container_horizontal}>
            {star_arr.map(star=>{return star;})}
        </View>
    );
}
