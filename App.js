import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Config from "react-native-config";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! {Config.APP_ENV} hjjh</Text>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8f1c1cff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
