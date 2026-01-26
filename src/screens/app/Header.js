import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { useTheme } from "../../theme/ThemeContext";

export default function CineHeader({ onProfilePress, initials }) {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={styles.title}>CinePlus</Text>
            <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
                <View style={[styles.initialsContainer, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.initialsText, { color: theme.text }]}>{initials || '?'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

CineHeader.propTypes = {
    onProfilePress: PropTypes.func,
    initials: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 10,
    },
    title: {
        color: "#e40505ff",
        fontSize: 32,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    profileButton: {
        padding: 5,
    },
    initialsContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: "#bbafafff",
        justifyContent: "center",
        alignItems: "center",
    },
    initialsText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
});
