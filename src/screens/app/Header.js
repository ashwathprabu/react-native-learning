import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CineHeader({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer && navigation.openDrawer()}>
                <Ionicons name="menu" size={26} color="#5e5b5bff" />
            </TouchableOpacity>
            <Text style={styles.title}>CinePlus</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Ionicons name="person-circle-outline" size={28} color="#868484ff" />
            </TouchableOpacity>
        </View>
    );
}

CineHeader.propTypes = {
    navigation: PropTypes.shape({
        openDrawer: PropTypes.func,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    title: {
        color: "#e40505ff",
        fontSize: 30,
        fontWeight: "700",
        letterSpacing: 1,
    },
});
