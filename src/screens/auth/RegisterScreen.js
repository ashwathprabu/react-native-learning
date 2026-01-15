import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

export default function RegisterScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <Button title="Back to Login" onPress={() => navigation.goBack()} />
        </View>
    );
}

RegisterScreen.propTypes = {
    navigation: PropTypes.shape({
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
});
