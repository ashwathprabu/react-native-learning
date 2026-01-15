import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useAuth } from '../../store/authStore';

export default function HomeScreen({ navigation }) {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to CinePlus</Text>
            <Button title="My Profile" onPress={() => navigation.navigate('Profile')} />
            <Button title="Go to Chat" onPress={() => navigation.navigate('Chat')} />

            <Button title="Support" onPress={() => navigation.navigate('Support')} />
            <Button title="Logout" onPress={logout} color="red" />
        </View>
    );
}

HomeScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10 },
    title: { fontSize: 24, marginBottom: 20 },
});
