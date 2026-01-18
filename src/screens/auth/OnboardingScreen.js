import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../store/authStore';

const OnboardingScreen = () => {
    const { login } = useAuth();
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
                        onPress={() => login('authorized')}
                    >
                        <Text style={styles.buttonText}>GET STARTED</Text>
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
