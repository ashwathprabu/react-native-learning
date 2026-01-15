import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Config from 'react-native-config';
import BootSplash from 'react-native-bootsplash';

import { getFontFamily } from './src/utils/fontFamily';

export default function App() {
  useEffect(() => {
    const init = async () => {
      // load fonts, auth, config, etc.
    };

    init().finally(() => {
      BootSplash.hide({ fade: true });
      console.log('BootSplash hidden');
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Open up App.js to start working on your app! {Config.APP_ENV}
      </Text>

      <Text style={{ fontFamily: getFontFamily(true, 'medium') }}>
        My text in the right font family - Montserrat Medium!
      </Text>

      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6E3194',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
