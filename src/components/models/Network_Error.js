import { 
    SafeAreaView,
    Text,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from "../../styles/css.js";
import { MaterialIcons } from '@expo/vector-icons'; 

export const Display_Error = ({network_error}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <MaterialIcons name="error-outline" size={48} color="tomato" />
      <Text style={styles.error_text}>{network_error}</Text>
    </SafeAreaView>
  )
}