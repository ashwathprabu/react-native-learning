import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IconMap = {
    material: MaterialCommunityIcons,
    ion: Ionicons,
    fa: FontAwesome,
    md: MaterialCommunityIcons,
};

const DynamicIcon = ({ type, name, size, color }) => {
    const IconComponent = IconMap[type];
    if (!IconComponent) return null;

    return <IconComponent name={name} size={size} color={color} />;
};

DynamicIcon.propTypes = {
    type: PropTypes.oneOf(['material', 'ion', 'fa', 'md']).isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    color: PropTypes.string,
};

const FloatingTabBar = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            <View style={styles.tabBar}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    // Define Icon based on route name (Example logic)
                    let icon;
                    if (route.name === 'Home') {
                        icon = {
                            type: 'material',
                            name: isFocused ? 'movie-filter' : 'movie-filter-outline',
                        };
                    } else if (route.name === 'Chat') {
                        icon = {
                            type: 'ion',
                            name: isFocused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline',
                        };
                    } else if (route.name === 'WatchList') {
                        icon = {
                            type: 'md',
                            name: isFocused ? 'movie-open-plus' : 'movie-open-plus-outline',
                        };
                    } else if (route.name === 'Profile') {
                        icon = {
                            type: 'fa',
                            name: isFocused ? 'user' : 'user-o',
                        };
                    } else {
                        icon = { type: 'ion', name: 'ellipse-outline' }; // Default icon
                    }

                    return (
                        <TouchableOpacity
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabItem}
                        >
                            <DynamicIcon
                                type={icon.type}
                                name={icon.name}
                                size={27}
                                color="#9c0909ff"
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        // Transparent container so touches outside pass through if needed
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#0a0303ff',
        marginHorizontal: 20,
        marginBottom: 20, // Distance from bottom
        paddingVertical: 15,
        borderRadius: 35, // High radius for "Floating Capsule" look

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,

        // Shadow for Android
        elevation: 5,
        width: '55%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

FloatingTabBar.propTypes = {
    state: PropTypes.shape({
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            })
        ).isRequired,
        index: PropTypes.number.isRequired,
    }).isRequired,
    descriptors: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
        emit: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

export default FloatingTabBar;