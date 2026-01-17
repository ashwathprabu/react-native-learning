import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

const OTP_LENGTH = 6;

export default function OtpScreen({ route, navigation }) {
    const { email } = route.params;
    const [code, setCode] = useState('');
    const inputRef = useRef(null);

    const handleVerify = async () => {
        if (code.length !== OTP_LENGTH) {
            return Alert.alert('Error', 'Please enter the 6-digit code');
        }

        try {
            await Auth.confirmSignUp(email, code);
            navigation.replace('OtpSuccess');
        } catch (error) {
            Alert.alert('Verification Failed', error.message);
        }
    };

    const handleResend = async () => {
        try {
            await Auth.resendSignUp(email);
            Alert.alert('Success', 'Verification code resent');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const renderOtpBoxes = () => {
        return Array.from({ length: OTP_LENGTH }).map((_, index) => {
            const digit = code[index] || '';
            const isActive = index === code.length;

            return (
                <View
                    key={index}
                    style={[
                        styles.otpBox,
                        isActive && styles.activeOtpBox,
                    ]}
                >
                    <Text style={styles.otpText}>{digit}</Text>
                </View>
            );
        });
    };

    return (
        <ImageBackground
            source={require('../../assets/images/register-bg.jpg')}
            style={styles.background}
        >
            <View style={styles.overlay} />

            <View style={styles.container}>
                <Text style={styles.logo}>CINEPLUS</Text>
                <Text style={styles.title}>Verify Your Email</Text>
                <Text style={styles.subtitle}>
                    <Text>Enter the code sent to </Text>
                    <Text style={styles.email}>{email}</Text>
                </Text>
                {/* Hidden Input */}
                <TextInput
                    ref={inputRef}
                    value={code}
                    onChangeText={text => {
                        if (/^\d*$/.test(text)) {
                            setCode(text.slice(0, OTP_LENGTH));
                        }
                    }}
                    keyboardType="number-pad"
                    maxLength={OTP_LENGTH}
                    style={styles.hiddenInput}
                    autoFocus
                />

                {/* OTP Boxes */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => inputRef.current.focus()}
                    style={styles.otpContainer}
                >
                    {renderOtpBoxes()}
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton} onPress={handleVerify}>
                    <Text style={styles.primaryButtonText}>VERIFY</Text>
                </TouchableOpacity>

                <Text style={styles.resendText}>
                    Didn’t receive a code?{' '}
                    <Text style={styles.resendLink} onPress={handleResend}>
                        Resend
                    </Text>
                </Text>
            </View>
        </ImageBackground>
    );
}

OtpScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            email: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.75)',
    },
    logo: {
        color: '#E50914',
        fontSize: 45,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    icon: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        color: '#aaa',
        textAlign: 'center',
        marginBottom: 30,
        fontSize: 17,
    },
    email: {
        color: '#fff',
        fontWeight: '600',
    },

    hiddenInput: {
        position: 'absolute',
        opacity: 0,
    },

    otpContainer: {
        flexDirection: 'row',
        height: 56,
        justifyContent: 'space-evenly',
        marginBottom: 40,
    },
    otpBox: {
        width: 46,
        height: 54,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#555',
        justifyContent: 'center',
        borderBottomWidth: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    otpText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
    activeOtpBox: {
        borderColor: '#E50914',
    },
    primaryButton: {
        backgroundColor: '#E50914',
        paddingVertical: 16,
    },
    primaryButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resendText: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 13,
    },
    resendLink: {
        color: '#fff',
        fontWeight: '600',
    },
});
