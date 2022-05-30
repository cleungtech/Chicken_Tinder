import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

import styles from "../../styles/css.js";

export const Nav_Button = ({ button_name, route, nav_params, disabled }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route, nav_params)}
      style={styles.button}
      activeOpacity={0.5}
      disabled={disabled}
    >
      <Text style={styles.button_text}>{button_name}</Text>
    </TouchableOpacity>
  );
}

export const Landing_Banner = ({}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Login")}
      style={styles.header_container}
      activeOpacity={0.5}
    >
      <Image
        style={styles.header}
        source={require("../../../assets/chicken_tinder.png")}
      />
    </TouchableOpacity>
  );
}