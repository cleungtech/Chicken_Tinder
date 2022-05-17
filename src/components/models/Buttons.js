import { useNavigation } from '@react-navigation/native';
import {
  TouchableOpacity,
  Text,
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

export const Useless_Button = ({ button_name }) => {
  return (
    <TouchableOpacity
      onPress={() => alert("Not Implemented Yet!")}
      style={styles.button}
      activeOpacity={0.5}
    >
      <Text style={styles.button_text}>{button_name}</Text>
    </TouchableOpacity>
  );
}