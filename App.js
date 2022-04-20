import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { 
  Image, 
  TouchableOpacity, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRCode from 'react-qr-code';

import { Restaurants_Screen } from "./src/components/screens/Restaurants_Screen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login_Screen} />
        <Stack.Screen name="Select" component={Select_Screen} />
        <Stack.Screen name="Create Group" component={Create_Group_Screen} />
        <Stack.Screen name="Restaurants" component={Restaurants_Screen} />
        <Stack.Screen name="Share Link" component={Share_Link_Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Login_Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text>Login/Signup</Text>
      <Image
        style={styles.placeholder}
        source={require('./assets/tender.jpg')}
      />
      <Credentials inputfield="Username"/>
      <Credentials inputfield="Password"/>
      <Nav_Button button_name="Get Started" route="Select"/>
    </SafeAreaView>
  );
}

function Select_Screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Nav_Button button_name="We're Hangry NOW!" route="Create Group"/>
      <Useless_Button button_name="We're Hungry Later..."/>
    </View>
  )
}

function Create_Group_Screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Nav_Button button_name="Share Link" route="Share Link"/>
      <Useless_Button button_name="Join a Room" />
      <Useless_Button button_name="I'm Flying Solo" />
      <Nav_Button button_name="Go See Restaurants" route="Restaurants"/>
    </View>
  );
}

// function Restaurants_Screen() {
//   return (
//     <View style={styles.container}>
//       <Text>Nothing to see here</Text>
//     </View>
//   );
// }

function Share_Link_Screen() {
  return (
    <View style={{alignItems: "center", marginTop: 50}}>
      <QRCode value="https://www.google.com/" />
    </View>
  );
}

const Credentials = (props) => {
  return (
    <TextInput
      style={styles.credentials}
      placeholder={props.inputfield}
    />
  );
}

function Nav_Button({button_name, route}){
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route)}
      style={styles.button}
      activeOpacity={0.5}
    >
      <Text>{button_name}</Text>
    </TouchableOpacity>
  );
}

function Useless_Button({button_name}) {
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
  credentials: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 30,
    alignItems: 'center',
    backgroundColor: '#ff9800',
    padding: 5,
    borderRadius: 10
  },
  placeholder: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});
