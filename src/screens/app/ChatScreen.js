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
import PropTypes from 'prop-types';

export default function ChatScreen() {
    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const [inputText, setInputText] = useState('');
    const [isChatEnabled, setIsChatEnabled] = useState(false);
    const [quickReplies, setQuickReplies] = useState([
        { id: 'sub', text: 'Subscription Issue' },
        { id: 'play', text: 'Playback Issue' },
        { id: 'other', text: 'Other' },
    ]);

    const [messages, setMessages] = useState([
        {
            id: '1',
            text: 'Hello! How can we help you today? Please choose an option below.',
            sender: 'Cineplus Support',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const flatListRef = useRef();

    const addMessage = (text, sender) => {
        const newMessage = {
            id: Date.now().toString(),
            text,
            sender,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleQuickReply = (reply) => {
        setQuickReplies([]); // Clear replies after selection
        addMessage(reply.text, 'You');

        setTimeout(() => {
            addMessage("Our team will reach out to you shortly.", 'Cineplus Support');

            setTimeout(() => {
                addMessage("Are you still facing the issue?", 'Cineplus Support');
                setQuickReplies([
                    { id: 'yes', text: 'Yes' },
                    { id: 'no', text: 'No' },
                ]);
            }, 1000);
        }, 800);
    };

    const handleYesNo = (reply) => {
        setQuickReplies([]);
        addMessage(reply.text, 'You');

        if (reply.id === 'yes') {
            setIsChatEnabled(true);
            setTimeout(() => {
                addMessage("Chat enabled. You can now type your message below.", 'Cineplus Support');
            }, 500);
        } else {
            setTimeout(() => {
                addMessage("Great! We are glad to help. If you need anything else, just let us know.", 'Cineplus Support');
            }, 500);
        }
    };

    const handleSend = () => {
        if (inputText.trim().length === 0 || !isChatEnabled) return;
        addMessage(inputText.trim(), 'You');
        setInputText('');
    };

    const MessageItem = ({ item, theme }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const [showMoreNeeded, setShowMoreNeeded] = useState(false);
        const isUser = item.sender === 'You';

        const onTextLayout = (e) => {
            // If the text would take more than 1 line, show the toggle
            if (e.nativeEvent.lines.length > 1 && !isExpanded) {
                setShowMoreNeeded(true);
            }
        };

        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.userMessageContainer : styles.supportMessageContainer
            ]}>
                <View style={[
                    styles.messageBubble,
                    isUser ?
                        { backgroundColor: theme.primary, borderBottomRightRadius: 2 } :
                        { backgroundColor: theme.surface, borderBottomLeftRadius: 2 },
                    // If it needs truncation at any point, keep it full width of container
                    (showMoreNeeded || isExpanded) && { width: '100%' }
                ]}>
                    {!isUser && (
                        <Text style={[styles.senderName, { color: theme.primary }]}>
                            {item.sender}
                        </Text>
                    )}
                    <Text
                        style={[
                            styles.messageText,
                            { color: isUser ? '#FFFFFF' : theme.text }
                        ]}
                        numberOfLines={isExpanded ? undefined : 1}
                        ellipsizeMode="tail"
                        onTextLayout={onTextLayout}
                    >
                        {item.text}
                    </Text>

                    {showMoreNeeded && (
                        <TouchableOpacity
                            onPress={() => setIsExpanded(!isExpanded)}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={[
                                styles.showMoreText,
                                { color: isUser ? 'rgba(255,255,255,0.9)' : theme.primary }
                            ]}>
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </Text>
                        </TouchableOpacity>
                    )}

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

    MessageItem.propTypes = {
        item: PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            sender: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired,
        }).isRequired,
        theme: PropTypes.shape({
            primary: PropTypes.string.isRequired,
            surface: PropTypes.string.isRequired,
            background: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            textMuted: PropTypes.string.isRequired,
            border: PropTypes.string.isRequired,
        }).isRequired,
    };

    const renderMessage = ({ item }) => (
        <MessageItem item={item} theme={theme} />
    );

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

                {quickReplies.length > 0 && (
                    <View style={styles.quickReplyContainer}>
                        {quickReplies.map(reply => (
                            <TouchableOpacity
                                key={reply.id}
                                style={[styles.quickReplyButton, { backgroundColor: theme.surface, borderColor: theme.primary }]}
                                onPress={() => {
                                    if (reply.id === 'yes' || reply.id === 'no') {
                                        handleYesNo(reply);
                                    } else {
                                        handleQuickReply(reply);
                                    }
                                }}
                            >
                                <Text style={[styles.quickReplyText, { color: theme.text }]}>{reply.text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <View style={[
                    styles.inputContainer,
                    {
                        borderTopColor: theme.border,
                        paddingBottom: Math.max(insets.bottom, 16) + 8,
                        backgroundColor: theme.background,
                        opacity: isChatEnabled ? 1 : 0.5
                    }
                ]}>
                    <TextInput
                        style={[styles.input, {
                            backgroundColor: theme.surface,
                            color: theme.text,
                            borderColor: theme.border
                        }]}
                        placeholder={isChatEnabled ? "Type a message..." : "Please choose an option first"}
                        placeholderTextColor={theme.textMuted}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        editable={isChatEnabled}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: theme.primary }]}
                        onPress={handleSend}
                        disabled={inputText.trim().length === 0 || !isChatEnabled}
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
    showMoreText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 4,
        textDecorationLine: 'underline',
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
    quickReplyContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        paddingBottom: 8,
        justifyContent: 'center',
    },
    quickReplyButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        margin: 4,
    },
    quickReplyText: {
        fontSize: 14,
        fontWeight: '500',
    },
});
