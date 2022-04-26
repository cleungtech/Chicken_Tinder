import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { 
  SafeAreaView,
} from 'react-native';


import QRCode from "react-qr-code";

export function Share_Link_Screen() {
    return (
      <SafeAreaView style={{alignItems: "center", marginTop: 50}}>
        <StatusBar style="auto" />
        <QRCode value="https://www.google.com/" />
      </SafeAreaView>
    );
}