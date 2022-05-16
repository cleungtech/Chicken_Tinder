import { Text } from 'react-native';
import styles from "../../styles/css.js";

export const Error_Banner = (props) => {
  return (
    <Text style={styles.error_text}>{props.error_message}</Text>
  );
}