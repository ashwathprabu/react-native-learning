import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const PasswordInput = ({ value, onChangeText, placeholder, containerStyle, inputStyle, placeholderTextColor = "#ccc" }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.passwordContainer, containerStyle]}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={!showPassword}
                style={[styles.passwordInput, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize="none"
            />
            <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.eyeIcon}
            >
                <Icon
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={22}
                    color={placeholderTextColor}
                />
            </TouchableOpacity>
        </View>
    );
};

PasswordInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    placeholderTextColor: PropTypes.string,
};

const styles = StyleSheet.create({
    passwordContainer: {
        position: 'relative',
        borderRadius: 8,
        marginBottom: 16,
    },
    passwordInput: {
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: '#fff',
        padding: 14,
        paddingRight: 45,
        borderRadius: 8,
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -11 }],
    },
});

export default PasswordInput;
