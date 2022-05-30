import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Nav_Button } from "../widgets/Buttons.js";
import { Credentials } from "../widgets/TextFields.js";
import styles from "../../styles/css.js";
import {
  Image,
  Animated,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View
} from 'react-native';
import * as Location from 'expo-location';

const image_paths = {
    search: require("../../../assets/search_icon.png"),
  }

export const Location_Screen = ({ route }) => {

    const { user_info, flock_name } = route.params;
    const [errorMsg, setErrorMsg] = useState("");

    const [reverseLoc, setReverseLoc] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const [network_error, set_network_error] = useState("");

    const [display_lat, set_display_lat] = useState("");
    const [display_long, set_display_long] = useState("");

    const [display_city, set_display_city] = useState("-");
    const [display_region, set_display_region] = useState("-");
  
    function Reverse_Geocode(location_input) {
        (async () => {
            try {
                let reverse_result = await Location.reverseGeocodeAsync(location_input);
                setReverseLoc(reverse_result);
            } catch {
            }
        })();
    
        if (errorMsg) {
            set_network_error("Unable to find location due to restricted permissions");
        } else if (reverseLoc) {
            const new_city = reverseLoc[0].city;
            const new_region = reverseLoc[0].region;
            const new_country = reverseLoc[0].country;

            set_display_city(new_city);
            if (new_region === new_city){
                set_display_region(new_country);
            } else {
                set_display_region(new_region);
            }
        }
    };
    
    function Geocode_Search(search_input) {
        (async () => {
            try {
                let geocode_result = await Location.geocodeAsync(search_input);

                if (errorMsg) {
                    set_network_error("Unable to find location due to restricted permissions");
                } else if (geocode_result) {
        
                    set_display_lat(geocode_result[0].latitude);
                    set_display_long(geocode_result[0].longitude);
        
                    Reverse_Geocode({latitude:display_lat, longitude:display_long})
                }
            } catch {
                alert('Invalid input!'); 
            }
        })();
    };
  
    useEffect(() => {
      (async () => {
        let { status }  = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }
  
        let loc = await Location.getCurrentPositionAsync({});
        set_display_lat(loc.coords.latitude);
        set_display_long(loc.coords.longitude);

        Reverse_Geocode({latitude:display_lat, longitude:display_long})
      })();
    }, []);
  
    const fade_anim = useRef(new Animated.Value(0)).current;
    const fade_in = () => {
      Animated.timing(fade_anim, {
        useNativeDriver: true,
        toValue: 1,
        duration: 500,
      }).start();
    }
  
    useEffect(() => {
      fade_in();
    }, []);
  
    return(
        Render_Screen({
            fade_anim, 
            display_city, 
            display_region, 
            display_lat, 
            display_long, 
            searchInput, 
            setSearchInput,
            Geocode_Search, 
            user_info, 
            flock_name,
            Search_Location_Button
        })
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
  
  function Search_Location_Button({ press_function, search_input, image_path }) {
    return (
      <TouchableOpacity
        onPress={() => press_function(search_input)}
        activeOpacity={0.5}
      >
        <Image
            style={styles.search_icon}
            source={image_path}
        />
      </TouchableOpacity>
    );
  }

function Render_Screen({
    fade_anim, 
    display_city, 
    display_region, 
    display_lat, 
    display_long, 
    searchInput, 
    setSearchInput,
    Geocode_Search, 
    user_info, 
    flock_name,
    Search_Location_Button}) {

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
  
            <Animated.View style={[{ opacity: fade_anim, alignItems: 'center' }]}>
                <View style={{
                    flexDirection: 'column',
                    // flex:1,
                    margin:20,
                    }}>
              
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // flex:1,
                    }}>
                        <Text>Your location is:</Text>
                        <Text style={styles.bold_text_yellow}>{display_city}, {display_region}</Text>
                        <Text style={styles.normal_text_yellow}>({display_lat}, {display_long})</Text>
                    </View>
                    
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    }}>
                        <Text style={styles.note_text_black}>
                            If this looks right, you're ready to go!
                        </Text>
                        <Text style={styles.note_text_black}>
                            Otherwise, you can search manually here.
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            margin:10,
                        }}>
                          <Credentials 
                              style={{
                                  height: 30,
                                  margin: 0,
                                  borderWidth: 1,
                                  padding: 0,
                                  backgroundColor: 'white',
                              }}
                              inputfield="Find locations to search near"
                              change_function={searchInput => setSearchInput(searchInput.toString())}
                          />
                          <Search_Location_Button
                              press_function={Geocode_Search}
                              search_input={searchInput}
                              image_path={image_paths.search}
                          />
                        </View>
                    </View>
  
                    <View style={{
                        flexDirection: 'column',
                        margin:10,
                        }}>
                        <Send_Location_Button
                            button_name="I'm ready"
                            user_info={user_info}
                            flock_name={flock_name}
                            latitude= {display_lat}
                            longitude= {display_long}
                        />
                    </View>
  
                </View>
  
            </Animated.View>
  
        </SafeAreaView>
      )
  }