import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Message } from '../components/Message';
import colors from '../constants/colors';
import { router } from 'expo-router';

const MOCK_MESSAGES = [
  {
    id: '1',
    text: 'Hey there! How are you?',
    isMe: false,
    timestamp: '2023-11-18T10:30:00Z',
  },
  {
    id: '2',
    text: 'I\'m doing great, thanks for asking! How about you?',
    isMe: true,
    timestamp: '2023-11-18T10:32:00Z',
  },
  {
    id: '3',
    text: 'I\'m good too! Just working on some new features for our app.',
    isMe: false,
    timestamp: '2023-11-18T10:33:00Z',
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      isMe: true,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    setTimeout(() => {
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        text: 'Thanks for your message! I\'ll get back to you soon.',
        isMe: false,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1000);
  };

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} onPress={() => router.back()} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userStatus}>Online</Text>
          </View>
        </View>
        <Ionicons name="ellipsis-vertical" size={20} color={colors.primary} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Message
            text={item.text}
            isMe={item.isMe}
            timestamp={item.timestamp}
          />
        )}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => 
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => 
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachmentButton}>
          <Ionicons name="attach" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={colors.text.secondary}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          disabled={message.trim() === ''}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={message.trim() === '' ? colors.text.secondary : colors.primary} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  userStatus: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  messagesContainer: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  attachmentButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    color: colors.text.primary,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
});