import { ActivityIndicator, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from "../../styles/css.js";

export const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ActivityIndicator size="large" />
    </SafeAreaView>
  )
}