import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SupportScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Support</Text>
            <Text>Contact support info here.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 20 },
});
