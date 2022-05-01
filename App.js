import { StatusBar } from 'expo-status-bar';
import React, {Component, useState} from 'react';
import { 
  Image, 
  TouchableOpacity, 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {
  getHeaderTitle,
  Header,
  HeaderBackButton,
  SafeAreaProviderCompat,
  Screen,
} from '@react-navigation/elements';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QRCode from 'react-qr-code';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//import { NavigationBar } from 'navigationbar-react-native';

// ***********************************************************************************

const Stack = createNativeStackNavigator();

const bottom_tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator> */}
        <bottom_tab.Navigator
          initialRouteName="Welcome"

          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Welcome') {
                iconName = focused ? 'home' : 'egg-outline';
              } else if (route.name === 'Select Role') {
                iconName = focused ? 'person' : 'egg-outline';
              } else if (route.name === 'Select Timeline') {
                iconName = focused ? 'time' : 'egg-outline';
              } else if (route.name === 'Create Group') {
                iconName = focused ? 'add-circle' : 'egg-outline';
              } else if (route.name === 'Lobby') {
                iconName = focused ? 'people' : 'egg-outline';
              // } else if (route.name === 'Tutorial') {
              //   iconName = focused ? 'library' : 'egg-outline';
              } else if (route.name === 'Voting') {
                iconName = focused ? 'restaurant' : 'egg-outline';
              // } else if (route.name === 'Tiebreaker') {
              //   iconName = focused ? 'create' : 'egg-outline';
              } else if (route.name === 'Results') {
                iconName = focused ? 'qr-code' : 'egg-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: chicken_red,
            tabBarInactiveTintColor: chicken_red,
            tabBarLabelPosition: 'below-icon',
            tabBarShowLabel: true,
            title: '',
          })}
        >
          <bottom_tab.Screen
            name="Welcome"
            component={Welcome_screen}
            options={{
              tabBarLabel: 'Welcome',
              backgroundColor: chicken_red,
              // headerBackground: chicken_red,
            }}
          />
          <bottom_tab.Screen
            name="Select Role"
            component={Select_host_guest_screen}
            options={{
              tabBarLabel: 'Role',        
            }}
          />
          <bottom_tab.Screen
            name="Select Timeline"
            component={Select_now_later_screen}
            options={{
              tabBarLabel: 'Timeline',            
            }}
          />
          <bottom_tab.Screen
            name="Create Group"
            component={Create_group_screen}
            options={{
              tabBarLabel: 'Create',            
            }}
          />
          <bottom_tab.Screen
            name="Lobby"
            component={Lobby_screen}
            options={{
              tabBarLabel: 'Lobby',            
            }}
          />
          {/* <bottom_tab.Screen
            name="Tutorial"
            component={Tutorial_screen}
            options={{
              tabBarLabel: 'Tutorial',            
            }}
          /> */}
          <bottom_tab.Screen
            name="Voting"
            component={Voting_screen}
            options={{
              tabBarLabel: 'Voting',            
            }}
          />
          {/* <bottom_tab.Screen
            name="Tiebreaker"
            component={Tiebreak_screen}
            options={{
              tabBarLabel: 'Tiebreaker',            
            }}
          /> */}
          <bottom_tab.Screen
            name="Results"
            component={Results_screen}
            options={{
              tabBarLabel: 'Results',            
            }}
          />
        </bottom_tab.Navigator>
      {/* </Stack.Navigator> */}
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

function Welcome_screen() {
  return (
    <SafeAreaView style={styles.welcome_container}>
      <StatusBar style="auto" />
      <Image
        style={styles.placeholder}
        source={require('./assets/chicken_tinder_outline_white.png')}
      />
      <Nav_Button button_name="Get Started" route="Select Role"/>
    </SafeAreaView>
  );
}

function Select_host_guest_screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Nav_Button button_name="Create a flock" route="Select Timeline"/>
      <Useless_Button button_name="Join a flock"/>
      <Useless_Button button_name="I'm flying solo"/>
    </View>
  )
}

function Select_now_later_screen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Nav_Button button_name="We're hungry now" route="Create Group"/>
      <Useless_Button button_name="We'll be hungry later"/>
    </View>
  )
}


function Create_group_screen() {
  return (
    <View style={styles.container}>
      <View style={styles.no_click_button}>
        <Text style={styles.title_text}>Your Flock</Text>
      </View>
      <View style={{padding:10}}></View>
      <QRCode value="https://google.com/" />
      <StatusBar style="auto" />
      {/* <Nav_Button button_name="Share Link" route="Share Link"/> */}
      <Useless_Button button_name="Copy Link" />
      <Nav_Button button_name="Go to Lobby" route="Lobby"/>
      {/* <Nav_Button button_name="Go See Restaurants" route="Restaurants"/> */}
    </View>
  );
}

function Lobby_screen() {
  return (
    <View style={styles.container}>
      <View style={styles.no_click_button}>
        <Text style={styles.title_text}>Our Coop:</Text>
      </View>
      <View style={{padding:10}}></View>
      <>
        <View style={styles.container_horizontal}>
          <Ionicons name='egg' size='24' color={chicken_red}/>
          <Text style={styles.lobby_text}>woodstock_lvr</Text>
        </View>
        <View style={styles.container_horizontal}>
          <Ionicons name='egg' size='24' color={chicken_red}/>
          <Text style={styles.lobby_text}>feathers_4_dayz</Text>
        </View>
        <View style={styles.container_horizontal}>
          <Ionicons name='egg' size='24' color={chicken_red}/>
          <Text style={styles.lobby_text}>coop_troop</Text>
        </View>
        <View style={styles.container_horizontal}>
          <Ionicons name='egg' size='24' color={chicken_red}/>
          <Text style={styles.lobby_text}>the_chick_2_pick</Text>
        </View>
      </>
    </View>
  );
}

function Tutorial_screen() {
  return (
    <View style={styles.container}>
      <View style={styles.no_click_button}>
        <Text style={styles.title_text}>Tutorial</Text>
      </View>
    </View>
  );
}

function Voting_screen() {
  return (
    <View style={styles.container}>
      <View style={styles.no_click_button}>
        <Text style={styles.title_text}>Let's Vote!</Text>
      </View>
      <>
        <View style={styles.container_horizontal}>
          <Image
            style={styles.image_icon}
            source={require('./assets/dislike_icon.png')}
          />

          <View style={styles.image_container}>
            <Image
              style={styles.image_rounded}
              source={require('./assets/restaurant_image.jpg')}
            />
          </View>

          <Image
            style={styles.image_icon}
            source={require('./assets/like_icon.png')}
          />
        </View>
      </>
    </View>
  );
}

function Tiebreak_screen() {
  return (
    <View style={styles.container}>
      <View style={styles.no_click_button}>
        <Text style={styles.title_text}>It's a Tie:</Text>
      </View>
    </View>
  );
}

function Results_screen() {
  return (
    <View style={styles.container}>
      <View style={styles.no_click_button}>
        <Text style={styles.title_text}>Results</Text>
      </View>
      <View style={{padding:10}}></View>
      <QRCode value="https://google.com/" />
      <StatusBar style="auto" />
      <Useless_Button button_name="Share Results" />
      <Useless_Button button_name="Vote Again" />
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

// const [bgColor, setBgColor] = useState(chicken_yellow_light);

// linking buttons to destination screens
function Nav_Button({button_name, route, backgroundColor}){
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      //onMouseEnter={() => backgroundColor=useState().chicken_yellow}
      //onMouseLeave={() => backgroundColor.useColorScheme(chicken_yellow_light)}
      onPress={() => navigation.navigate(route)}
      activeOpacity={0.5}
    >
      <Text style={styles.button_text}>{button_name}</Text>
    </TouchableOpacity>
  );
}

// ***********************************************************************************

// for placeholder buttons
function Useless_Button({button_name}) {
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

// ***********************************************************************************

const styles = StyleSheet.create({
  welcome_header: {
    flex: 1,
    backgroundColor: chicken_red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome_container: {
    flex: 1,
    backgroundColor: chicken_red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // vertical_spacer: {
  //   flex:
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  container_horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  container_inner: {
    margin: '20',
    alignItems: 'center',
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
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: chicken_yellow_light,
  },
  no_click_button: {
    marginTop: 30,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: chicken_red,
  },
  image_container: {
    marginTop: 30,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderColor: chicken_red_light,
    borderWidth: 5,
  },
  button_text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  title_text: {
    fontSize: 20,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
  lobby_text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: chicken_red,
  },
  placeholder: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  image_rounded: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  image_icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
});
