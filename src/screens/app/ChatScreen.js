import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ChatScreen() {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([
        {
            id: '1',
            text: 'Hello! How can we help you today?',
            sender: 'Cineplus Support',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const flatListRef = useRef();

    const handleSend = () => {
        if (inputText.trim().length === 0) return;

        const newMessage = {
            id: Date.now().toString(),
            text: inputText.trim(),
            sender: 'You',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
        setInputText('');

        // Simulate Support Response
        setTimeout(() => {
            const supportResponse = {
                id: (Date.now() + 1).toString(),
                text: "Thanks for reaching out! Our team will get back to you shortly.",
                sender: 'Cineplus Support',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prevMessages => [...prevMessages, supportResponse]);
        }, 1500);
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'You';
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.userMessageContainer : styles.supportMessageContainer
            ]}>
                <View style={[
                    styles.messageBubble,
                    isUser ?
                        { backgroundColor: theme.primary, borderBottomRightRadius: 2 } :
                        { backgroundColor: theme.surface, borderBottomLeftRadius: 2 }
                ]}>
                    {!isUser && (
                        <Text style={[styles.senderName, { color: theme.primary }]}>
                            {item.sender}
                        </Text>
                    )}
                    <Text style={[
                        styles.messageText,
                        { color: isUser ? '#FFFFFF' : theme.text }
                    ]}>
                        {item.text}
                    </Text>
                    <Text style={[
                        styles.timestamp,
                        { color: isUser ? 'rgba(255,255,255,0.7)' : theme.textMuted }
                    ]}>
                        {item.timestamp}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 90}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                />

                <View style={[
                    styles.inputContainer,
                    {
                        borderTopColor: theme.border,
                        paddingBottom: Math.max(insets.bottom, 16) + 8,
                        backgroundColor: theme.background
                    }
                ]}>
                    <TextInput
                        style={[styles.input, {
                            backgroundColor: theme.surface,
                            color: theme.text,
                            borderColor: theme.border
                        }]}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.textMuted}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: theme.primary }]}
                        onPress={handleSend}
                        disabled={inputText.trim().length === 0}
                    >
                        <Icon name="send" size={20} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    messageContainer: {
        marginBottom: 16,
        maxWidth: '80%',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
    },
    supportMessageContainer: {
        alignSelf: 'flex-start',
    },
    messageBubble: {
        padding: 12,
        borderRadius: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    senderName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    timestamp: {
        fontSize: 10,
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        fontSize: 16,
        maxHeight: 100,
        borderWidth: 1,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
