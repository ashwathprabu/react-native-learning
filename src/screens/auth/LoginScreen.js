import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useAuth } from '../../store/authStore';

export default function LoginScreen({ navigation }) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Mock login
        await login('mock-jwt-token');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CinePlus Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderBottomWidth: 1, marginBottom: 15, padding: 10 },
});
