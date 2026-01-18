import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CineHeader() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CinePlus</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        paddingHorizontal: 16,
    },
    title: {
        color: "#e40505ff",
        fontSize: 30,
        fontWeight: "700",
        letterSpacing: 1,
    },
});
