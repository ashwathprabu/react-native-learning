import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    Alert,
    ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { confirmSignUp, resendSignUpCode } from 'aws-amplify/auth';

const OTP_LENGTH = 6;

export default function OtpScreen({ route, navigation }) {
    const { email } = route.params;
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const handleVerify = async () => {
        if (code.length !== OTP_LENGTH) {
            return Alert.alert('Error', `Please enter the ${OTP_LENGTH}-digit code`);
        }

        setLoading(true);

        try {
            // v6 uses a single object with named properties
            const { isSignUpComplete, nextStep } = await confirmSignUp({
                username: email,          // The identifier used during sign-up
                confirmationCode: code    // Use 'confirmationCode', not 'code'
            });

            // Optionally check if sign up is fully complete
            if (isSignUpComplete) {
                navigation.replace('OtpSuccess');
            } else {
                console.log('Next step required:', nextStep);
            }
        } catch (error) {
            // Error handling remains similar, but check for specific Cognito error names if needed
            Alert.alert('Verification Failed', error.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            // v6 uses named parameters in a single object
            const deliveryDetails = await resendSignUpCode({
                username: email
            });

            // Optionally use deliveryDetails to show where the code was sent
            Alert.alert('Success', 'Verification code resent');
            console.log('Code sent to:', deliveryDetails.destination);
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to resend code');
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

                {/* OTP Input with Visual Boxes */}
                <View style={styles.otpContainer}>
                    {renderOtpBoxes()}
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
                        style={styles.otpInput}
                        autoFocus
                        caretHidden
                    />
                </View>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleVerify}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.primaryButtonText}>VERIFY</Text>
                    )}
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

    otpInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
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
