import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import ProfileContent from './ProfileContent';
import { useAuth } from '../../store/authStore';
import { useTheme } from '../../theme/ThemeContext';

export default function ProfileScreen({ navigation }) {
    const { userData, logout } = useAuth();
    const { theme } = useTheme();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <ProfileContent
                userData={userData}
                onLogout={logout}
                navigation={navigation}
            />
        </SafeAreaView>
    );
}

ProfileScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
