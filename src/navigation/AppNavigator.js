import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/app/HomeScreen';
import ChatScreen from '../screens/app/ChatScreen';
import SupportScreen from '../screens/app/SupportScreen';
import ProfileScreen from '../screens/app/ProfileScreen';

import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { theme } = useTheme();

    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: theme.background },
                headerStyle: { backgroundColor: theme.background },
                headerTintColor: theme.text,
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'User Profile' }}
            />
        </Stack.Navigator>
    );
}
