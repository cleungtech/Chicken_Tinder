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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ***********************************************************************************

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={welcome_screen} options={{ title: '' }} />
        <Stack.Screen name="Select Role" component={select_host_guest_screen} options={{ title: '' }} />
        <Stack.Screen name="Select Timeline" component={select_now_later_screen} options={{ title: '' }} />
        <Stack.Screen name="Create Group" component={create_group_screen} options={{ title: '' }} />
        <Stack.Screen name="Lobby" component={lobby_screen} options={{ title: '' }} />
        <Stack.Screen name="Tutorial" component={tutorial_screen} options={{ title: '' }} />
        <Stack.Screen name="Voting" component={voting_screen} options={{ title: '' }} />
        <Stack.Screen name="Tiebreaker" component={tiebreak_screen} options={{ title: '' , }} />
        <Stack.Screen name="Results" component={results_screen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ***********************************************************************************

const chicken_red = '#ff6a6a';
const chicken_yellow = '#ecaa1d';
const chicken_red_light = '#fc9797';
const chicken_yellow_light = '#eace92';
const chicken_yellow_dark = '#b87f04';

// ***********************************************************************************

function welcome_screen() {
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

function select_host_guest_screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Nav_Button button_name="Create a flock" route="Create Group"/>
      <Useless_Button button_name="Join a flock"/>
    </View>
  )
}

function select_now_later_screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Nav_Button button_name="We're hungry now" route="Create Group"/>
      <Useless_Button button_name="We'll be hungry later"/>
    </View>
  )
}


function create_group_screen() {
  return (
    <View style={{alignItems: "center", marginTop: 50}}>
      <QRCode value="https://google.com/" />
      <StatusBar style="auto" />
      {/* <Nav_Button button_name="Share Link" route="Share Link"/> */}
      <Useless_Button button_name="Join a Room" />
      <Useless_Button button_name="I'm Flying Solo" />
      {/* <Nav_Button button_name="Go See Restaurants" route="Restaurants"/> */}
    </View>
  );
}

function lobby_screen() {
  return (
    <View style={styles.container}>
      <Text>Nothing to see here</Text>
    </View>
  );
}

function tutorial_screen() {
  return (
    <View style={styles.container}>
      <Text>Nothing to see here</Text>
    </View>
  );
}

function voting_screen() {
  return (
    <View style={styles.container}>
      <Text>Nothing to see here</Text>
    </View>
  );
}

function tiebreak_screen() {
  return (
    <View style={styles.container}>
      <Text>Nothing to see here</Text>
    </View>
  );
}

function results_screen() {
  return (
    <View style={styles.container}>
      <Text>Nothing to see here</Text>
    </View>
  );
}

// ***********************************************************************************

// username and password
const Credentials = (props) => { 
  return (
    <TextInput
      style={styles.credentials}
      placeholder={props.inputfield}
    />
  );
}

// ***********************************************************************************

// linking buttons to destination screens
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

// ***********************************************************************************

// creating bottom tabs
const bottom_tab = createBottomTabNavigator();

function bottom_tabs() {
  return (
    <bottom_tab.Navigator
      initialRouteName="Welcome Tab"
      screenOptions={{
        tabBarActiveTintColor: chicken_yellow_light,
        tabBarInactiveTintColor: chicken_red_light,
        tabBarLabelPosition: 'below-icon'
      }}>
      <bottom_tab.Screen
        name="Welcome Tab"
        component={welcome_screen}
        options={{
          title: 'Welcome',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Select Role Tab"
        component={select_host_guest_screen}
        options={{
          title: 'Role',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Select Timeline Tab"
        component={select_now_later_screen}
        options={{
          title: 'Timeline',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Create Group Tab"
        component={create_group_screen}
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Lobby Tab"
        component={lobby_screen}
        options={{
          title: 'Lobby',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Tutorial Tab"
        component={tutorial_screen}
        options={{
          title: 'Tutorial',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Voting Tab"
        component={voting_screen}
        options={{
          title: 'Voting',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Tiebreaker Tab"
        component={tiebreak_screen}
        options={{
          title: 'Tiebreaker',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
      <bottom_tab.Screen
        name="Results Tab"
        component={results_screen}
        options={{
          title: 'Results',
          tabBarIcon: ({ color }) => <TabBarIcon name="egg" color={color} />,
        }}
      />
    </bottom_tab.Navigator>
  );
}

// ***********************************************************************************

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

// ***********************************************************************************

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
