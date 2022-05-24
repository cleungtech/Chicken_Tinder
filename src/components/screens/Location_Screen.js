import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { Credentials } from "../models/TextFields.js";
import styles from "../../styles/css.js";
import {
  Animated,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';
import {Constants, Permissions} from 'expo';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export const Location_Screen = ({ route }) => {

    const { user_info, flock_name } = route.params;
    const [loc, setLoc] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [reverseLoc, setReverseLoc] = useState(null);
    const [geocodeLoc, setGeocodeLoc] = useState(null);

    const [searchInput, setSearchInput] = useState(null);
  
    function Reverse_Geocode({location}) {
        (async () => {
            let reverseLoc = await Location.reverseGeocodeAsync({location});
            setReverseLoc(reverseLoc);
        })();
    
        if (errorMsg) {
            set_network_error("Unable to find location due to server error");
        } else if (reverseLoc) {
            city = reverseLoc.city;
            region = reverseLoc.region;
        }
    };
    
    function Geocode_Search(search_input) {
        (async () => {
            let geocodeLoc = await Location.geocodeAsync(search_input);
            setGeocodeLoc(geocodeLoc);
        })();
    
        if (errorMsg) {
            set_network_error("Unable to find location due to server error");
        } else if (geocodeLoc) {
            return(
                latitude = geocodeLoc.coords.latitude,
                longitude = geocodeLoc.coords.longitude
                // latitude = JSON.stringify(geocodeLoc.coords.latitude),
                // longitude = JSON.stringify(geocodeLoc.coords.longitude)
            )
        }
    };

    // console.log(latitude, longitude)
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return (
            <SafeAreaView style={styles.container}>
              <StatusBar style="auto" />
              <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
                <Text>Search Locations:</Text>
                <Credentials
                  inputfield="Find locations to search near"
                />
                <Search_Location_Button
                  button_name="Search"
                  press_function={Geocode_Search}
                  search_input={search_input}
                />
              </Animated.View>
            </SafeAreaView>
          )
        }
  
        let loc = await Location.getCurrentPositionAsync({});
        setLoc(loc);
      })();
    }, []);
  
    let latitude = 40.4406;
    let longitude = -79.9959; // Manhattan as default
    if (errorMsg) {
      set_network_error("Unable to find location due to server error");
    } else if (loc) {
      latitude = loc.coords.latitude;
      longitude = loc.coords.longitude;
    }
    
    console.log("");
    console.log("---------------------------------------------");
    console.log("location: ", loc);
    console.log("coordinates:", latitude, ",", longitude);
    console.log("---------------------------------------------");
  
    const fade_anim = useRef(new Animated.Value(0)).current;
    const fade_in = () => {
      Animated.timing(fade_anim, {
        useNativeDriver: true,
        toValue: 1,
        duration: 1000,
      }).start();
    }
  
    useEffect(() => {
      fade_in();
    }, []);
  
    console.log("");
    console.log("*********************************************");
    console.log("LOCATION_SCREEN");
    console.log("*********************************************");
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
            <View style={{
                flexDirection: 'column',
                flex:1,
                margin:20,
                }}>
            
                <View style={{
                    flexDirection: 'column',
                    }}>
                    <Text>Your location is:</Text>
                    <Text>{latitude}, {longitude}</Text>
                </View>
                
                {/* <View style={{ */}
                    {/* flexDirection: 'column', */}
                    {/* }}> */}
                    <View style={{
                        flexDirection: 'row',
                        flex:1,
                        margin:10,
                        }}>
                        <View style={{
                            // flex:4,
                            }}>
                            <Credentials 
                                style={{
                                    width:'80%',
                                }}
                                inputfield="Find locations to search near"
                                change_function={searchInput => setSearchInput(searchInput.toString())}
                            />
                        </View>
                        <View style={{
                            // flex:1,
                            }}>
                            <Search_Location_Button
                                press_function={Geocode_Search}
                                search_input={searchInput}
                            />
                        </View>
                    </View>
                {/* </View> */}

                <View style={{
                    flexDirection: 'column',
                    flex:6,
                    margin:10,
                    }}>
                </View>

                <View style={{
                    flexDirection: 'column',
                    flex:1,
                    margin:10,
                    }}>
                    <Send_Location_Button
                        button_name="See restaurants"
                        user_info={user_info}
                        flock_name={flock_name}
                        latitude= {latitude}
                        longitude= {longitude}
                    />
                </View>

            </View>



        </Animated.View>

      </SafeAreaView>
    )
  }
  
  const Send_Location_Button = ({ button_name, user_info, flock_name, latitude, longitude }) => {
    return (
      <Nav_Button
        button_name={button_name}
        route="Share Link"
        nav_params={{
          user_info: user_info,
          flock_name: flock_name,
          latitude: latitude,
          longitude: longitude
        }}
      />
    )
  }
  
  function Search_Location_Button({ press_function, search_input }) {
    return (
      <TouchableOpacity
        onPress={() => press_function(search_input)}
        style={styles.vote_button}
        activeOpacity={0.5}
      >
        {/* <Text>{button_name}</Text> */}
        <Ionicons name='search' style={styles.search_icon}/>
      </TouchableOpacity>
    );
  }