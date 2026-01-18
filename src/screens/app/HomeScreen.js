import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import CineHeader from './Header';
import FeaturedCarousel from './FeaturedCarousel';
import FloatingTabBar from './FloatingTabBar';

export default function HomeScreen({ navigation }) {
    // Mock state for FloatingTabBar since it's integrated directly
    const mockState = {
        index: 0,
        routes: [
            { key: 'Home-1', name: 'Home' },
            { key: 'Chat-1', name: 'Chat' },
            { key: 'WatchList-1', name: 'WatchList' },
            { key: 'Profile-1', name: 'Profile' },
        ],
    };

    const mockDescriptors = {
        'Home-1': { options: { title: 'Home' } },
        'Chat-1': { options: { title: 'Chat' } },
        'WatchList-1': { options: { title: 'WatchList' } },
        'Profile-1': { options: { title: 'Profile' } },
    };

    const mockNavigation = {
        navigate: (name) => navigation.navigate(name),
        emit: () => ({ defaultPrevented: false }),
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <CineHeader navigation={navigation} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <FeaturedCarousel />

                {/* Additional sections can be added here */}
                <View style={styles.content}>
                    {/* Welcome message or other content */}
                </View>
            </ScrollView>

            <FloatingTabBar
                state={mockState}
                descriptors={mockDescriptors}
                navigation={mockNavigation}
            />
        </SafeAreaView>
    );
}

HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1a1818ff',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Space for floating tab bar
    },
    content: {
        padding: 20,
    },
});
