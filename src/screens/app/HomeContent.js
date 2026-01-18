import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FeaturedCarousel from './FeaturedCarousel';

export default function HomeContent() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <FeaturedCarousel />
            <View style={styles.content}>
                {/* Additional home sections */}
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
    },
});
