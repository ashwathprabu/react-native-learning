import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    color: '#E50914',
    fontSize: 34,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 24,
    alignSelf: 'center',
  },
input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
},
  primaryButton: {
    backgroundColor: '#E50914',
    paddingVertical: 16,
    borderRadius: 6,
    marginTop: 10,
  },
  primaryButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  orText: {
    color: '#aaa',
    marginHorizontal: 10,
    fontSize: 12,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#555',
    paddingVertical: 14,
    borderRadius: 6,
  },
  googleButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
  },
  footerText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 24,
    fontSize: 13,
  },
  link: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default function RegisterScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/images/register-bg.jpg')}
      style={styles.background}
    >
      {/* Dark overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.container}>
        {/* Logo */}
        <Text style={styles.logo}>CINEPLUS</Text>

        {/* Title */}
        <Text style={styles.title}>Sign Up</Text>

        {/* Inputs */}
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          style={styles.input}
        />

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text
            style={styles.link}
            onPress={() => navigation.goBack()}
          >
            Log in
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

RegisterScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
