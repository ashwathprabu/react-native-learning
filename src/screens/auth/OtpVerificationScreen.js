import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

export default function OtpSuccessScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/images/register-bg.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Text style={styles.successIcon}>✔</Text>

        <Text style={styles.title}>Verification Successful</Text>
        <Text style={styles.subtitle}>
          From now on, you are part of CinePlus
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.primaryButtonText}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

OtpSuccessScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  successIcon: {
    fontSize: 64,
    color: '#E50914',
    textAlign: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#E50914',
    paddingVertical: 16,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
