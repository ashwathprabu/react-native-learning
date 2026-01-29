import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Switch } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import { useTheme } from '../../theme/ThemeContext';

export default function ProfileContent({ userData, onLogout, navigation }) {
    const { theme, isDarkMode, toggleTheme } = useTheme();

    const fullName = userData
        ? `${userData.given_name || ''} ${userData.family_name || ''}`.trim()
        : 'User Name';

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: theme.background }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={[styles.header, { borderBottomColor: theme.border }]}>
                <View style={[styles.avatarPlaceholder, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.avatarText, { color: theme.text }]}>
                        {userData ? (userData.given_name?.[0] || '') + (userData.family_name?.[0] || '') : '?'}
                    </Text>
                </View>
                <Text style={[styles.title, { color: theme.text }]}>{fullName}</Text>
                <Text style={[styles.email, { color: theme.textMuted }]}>{userData?.email || ''}</Text>
            </View>

            <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: theme.notification }]}>General</Text>

                <TouchableOpacity
                    style={[styles.menuItem, { borderBottomColor: theme.border }]}
                    onPress={() => navigation.navigate('Chat')}
                >
                    <View style={styles.menuItemLeft}>
                        <MaterialCommunityIcons name="help-circle-outline" size={24} color={theme.text} />
                        <Text style={[styles.menuItemText, { color: theme.text }]}>Support</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.textMuted} />
                </TouchableOpacity>

                <View style={[styles.menuItem, { borderBottomColor: theme.border }]}>
                    <View style={styles.menuItemLeft}>
                        <MaterialCommunityIcons name="theme-light-dark" size={24} color={theme.text} />
                        <Text style={[styles.menuItemText, { color: theme.text }]}>Dark Mode</Text>
                    </View>
                    <Switch
                        value={isDarkMode}
                        onValueChange={toggleTheme}
                        trackColor={{ false: theme.surface, true: theme.notification }}
                        thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
                    />
                </View>
            </View>

            <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: theme.surface, borderColor: theme.notification }]}
                onPress={() => {
                    console.log('Sign Out button pressed');
                    onLogout();
                }}
            >
                <MaterialCommunityIcons name="logout" size={24} color={theme.notification} />
                <Text style={[styles.logoutText, { color: theme.notification }]}>Sign Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

ProfileContent.propTypes = {
    userData: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        padding: 30,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
    },
    section: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 15,
        letterSpacing: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 18,
        marginLeft: 15,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
    },
    logoutText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
