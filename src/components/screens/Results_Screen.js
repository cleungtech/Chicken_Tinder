import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Nav_Button } from "../models/Buttons.js";
import { backend_api, frontend_url } from '../../constants';
// import { useNavigation } from '@react-navigation/native';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import styles from "../../styles/css.js";


export function Results_Screen({ route }) {
  console.log("");
  console.log("*********************************************");
  console.log("RESULTS_SCREEN");
  console.log("*********************************************");
  console.log(flock_info)
  return (
    <Nav_Button
    button_name="Try Again"
    route="Login Screen"
  />
  )
}