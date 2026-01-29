import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

import { signUp } from '../../api/auth/cognito';
import PasswordInput from '../../components/PasswordInput';

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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return Alert.alert('Error', 'Please fill all required fields');
        }

        if (password !== confirmPassword) {
            return Alert.alert('Error', 'Passwords do not match');
        }

        setLoading(true);

        const response = await signUp({ firstName, lastName, email, phone, password });

        setLoading(false);

        if (response.success) {
            Alert.alert(
                'Success',
                'Account created! Please check your email for verification.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        } else {
            Alert.alert('Error', response.error);
        }
    };

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
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={lastName}
                    onChangeText={setLastName}
                />

                <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="#aaa"
                    keyboardType="phone-pad"
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                />

                <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <PasswordInput
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                />

                <PasswordInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp} disabled={loading}>
                    <Text style={styles.primaryButtonText}>{loading ? 'Signing Up...' : 'SIGN UP'}</Text>
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
