import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import CineHeader from './Header';
import FloatingTabBar from './FloatingTabBar';
import HomeContent from './HomeContent';
import WatchListContent from './WatchListContent';
import ProfileContent from './ProfileContent';

export default function HomeScreen({ navigation }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const routes = [
        { key: 'Home-1', name: 'Home' },
        { key: 'Chat-1', name: 'Chat' },
        { key: 'WatchList-1', name: 'WatchList' },
        { key: 'Profile-1', name: 'Profile' },
    ];

    const mockState = {
        index: activeIndex,
        routes: routes,
    };

    const mockDescriptors = {
        'Home-1': { options: { title: 'Home' } },
        'Chat-1': { options: { title: 'Chat' } },
        'WatchList-1': { options: { title: 'WatchList' } },
        'Profile-1': { options: { title: 'Profile' } },
    };

    const mockNavigation = {
        navigate: (name) => {
            if (name === 'Chat') {
                navigation.navigate('Chat');
            } else {
                const index = routes.findIndex(r => r.name === name);
                if (index !== -1) setActiveIndex(index);
            }
        },
        emit: () => ({ defaultPrevented: false }),
    };

    const renderContent = () => {
        switch (activeIndex) {
            case 0: return <HomeContent />;
            case 2: return <WatchListContent />;
            case 3: return <ProfileContent />;
            default: return <HomeContent />;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
            <CineHeader />

            {renderContent()}

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
});
