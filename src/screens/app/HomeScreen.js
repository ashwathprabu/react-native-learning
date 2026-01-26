import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { useAuth } from '../../store/authStore';
import { useTheme } from '../../theme/ThemeContext';
import CineHeader from './Header';
import FloatingTabBar from './FloatingTabBar';
import HomeContent from './HomeContent';
import WatchListContent from './WatchListContent';

export default function HomeScreen({ navigation }) {
    const { userData } = useAuth();
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);

    const getInitials = () => {
        if (!userData) return '';
        const first = userData.given_name ? userData.given_name[0] : '';
        const last = userData.family_name ? userData.family_name[0] : '';
        return (first + last).toUpperCase();
    };

    const initials = getInitials();

    const routes = [
        { key: 'Home-1', name: 'Home' },
        { key: 'WatchList-1', name: 'WatchList' },
    ];

    const mockState = {
        index: activeIndex,
        routes: routes.filter(r => r.name !== 'Chat'),
    };

    const mockDescriptors = {
        'Home-1': { options: { title: 'Home' } },
        'WatchList-1': { options: { title: 'WatchList' } },
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
            case 1: return <WatchListContent />;
            default: return <HomeContent />;
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
            <CineHeader
                onProfilePress={() => navigation.navigate('Profile')}
                initials={initials}
            />

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
    },
});
