import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageBackground,
    Alert,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { signIn, getCurrentUser, signOut, fetchUserDetails } from '../../api/auth/cognito';
import { useAuth } from '../../store/authStore';
import PasswordInput from '../../components/PasswordInput';

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
        alignItems: 'center',
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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();


    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        const { success } = await getCurrentUser();
        if (success) {
            login('authorized');
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        try {
            console.log('Login attempt started for:', email);
            await signOut();
            setLoading(true);

            const response = await signIn({ email, password });
            console.log('SignIn Response:', JSON.stringify(response, null, 2));

            if (response.success) {
                // Check if user needs to confirm their account
                if (!response.data.isSignedIn && response.data.nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
                    console.log('Navigation to OtpVerification');
                    setLoading(false);
                    navigation.navigate('OtpVerification', { email });
                    return;
                }

                if (response.data.isSignedIn && response.data.nextStep?.signInStep === 'DONE') {
                    console.log('SignIn successful, fetching user details...');
                    const userDetails = await fetchUserDetails();
                    console.log('User Details Response:', JSON.stringify(userDetails, null, 2));

                    if (userDetails.success) {
                        const { data } = userDetails;
                        if (data['custom:is_onboarded'] === 'false') {
                            console.log('Navigation to Onboarding');
                            setLoading(false);
                            navigation.navigate('Onboarding');
                            return;
                        }
                        console.log('User authenticated, updating auth store');
                        login('authorized');
                    } else {
                        console.error('Failed to fetch user details:', userDetails.error);
                        Alert.alert('Login Error', 'Could not fetch user profile details.');
                    }
                } else {
                    console.log('Login step not handled:', response.data.nextStep?.signInStep);
                    Alert.alert('Login Failed', 'Unexpected login status.');
                }
            } else {
                console.log('SignIn Failed:', response.error);
                Alert.alert('Login Failed', response.error);
            }
        } catch (error) {
            console.error('Login process error:', error);
            Alert.alert('Error', 'An unexpected error occurred during login. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <PasswordInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>SIGN IN</Text>
                    )}
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
