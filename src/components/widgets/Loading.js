import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import styles from "../../styles/css.js";
import { chicken_colors } from "../../styles/css.js";


export const Loading = ({ message }) => {
  if (!message) message = "";
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>{message}</Text>
      <ActivityIndicator size="large" color={chicken_colors.yellow}/>
    </SafeAreaView>
  )
}