import React, { useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ActivityIndicator,
    Alert,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../store/authStore';
import { updateUserOnboardedStatus } from '../../api/auth/cognito';

const OnboardingScreen = () => {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleGetStarted = async () => {
        setLoading(true);
        try {
            const response = await updateUserOnboardedStatus();
            if (response.success) {
                login('authorized');
            } else {
                console.error('Failed to update onboarding status:', response.error);
                Alert.alert(
                    'Update Warning',
                    'We couldn\'t update your onboarding status on the server, but you can still proceed. Error: ' + response.error,
                    [{ text: 'Proceed', onPress: () => login('authorized') }]
                );
            }
        } catch (error) {
            console.error('Error in handleGetStarted:', error);
            login('authorized');
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />

            {/* Background Image */}
            <ImageBackground
                source={require('../../assets/images/onboarding-bg.png')}
                style={styles.background}
                resizeMode="cover"
            >
                {/* Bottom Fade */}
                {/* <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,2)', '#000']}
                    style={styles.gradient}
                > */}
                <View style={styles.gradient}>
                    <Text style={styles.title}>
                        Unlimited moviesd, TV shows & more
                    </Text>

                    <Text style={styles.subtitle}>
                        Watch anywhere. Cancel anytime.
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleGetStarted}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>GET STARTED</Text>
                        )}
                    </TouchableOpacity>
                    {/* </LinearGradient> */}
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    background: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    gradient: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 80,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        lineHeight: 56,
        height: 180,
        width: '70%',
        textAlign: 'center',
    },
    subtitle: {
        color: '#ccc',
        fontSize: 20,
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#E50914',
        paddingVertical: 16,
        borderRadius: 6,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',

        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.8,
    },
});

export default OnboardingScreen;
