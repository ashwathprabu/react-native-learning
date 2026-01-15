import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.65)',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        color: '#E50914',
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 40,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: '#fff',
        padding: 14,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#E50914',
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    footerText: {
        color: '#ccc',
        textAlign: 'center',
        marginTop: 20,
    },
    link: {
        color: '#fff',
        fontWeight: '600',
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    googleButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
    },
});

export default function LoginScreen({ navigation }) {
    return (
        <ImageBackground
            source={require('../../assets/images/login-bg.jpg')}
            style={styles.background}
        >
            {/* Dark overlay */}
            <View style={styles.overlay} />

            {/* Content */}
            <View style={styles.container}>
                <Text style={styles.logo}>CINEPLUS</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#ccc"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    secureTextEntry
                    style={styles.input}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Don’t have an account?{' '}
                    <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
                        Sign Up
                    </Text>
                </Text>
                {/* OR separator */}
                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text style={styles.orText}>OR</Text>
                    <View style={styles.line} />
                </View>

                {/* Google Sign Up */}
                <TouchableOpacity style={styles.googleButton}>
                    <Image
                        source={require('../../assets/images/google.png')}
                        style={styles.googleIcon}
                    />
                    <Text style={styles.googleButtonText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

LoginScreen.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
