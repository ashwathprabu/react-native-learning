import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

export default function ProfileContent() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                <Text style={styles.title}>User Profile</Text>
                <Text style={styles.text}>User details will be shown here.</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    text: {
        color: '#ccc',
    },
});
