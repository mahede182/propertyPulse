import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

interface MessageProps {
  text: string;
  isMe: boolean;
  timestamp: string;
}

export const Message = ({ text, isMe, timestamp }: MessageProps) => {
  return (
    <View style={[
      styles.messageContainer,
      isMe ? styles.myMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        isMe ? styles.myBubble : styles.otherBubble
      ]}>
        <Text style={styles.messageText}>{text}</Text>
        <Text style={styles.timestamp}>
          {new Date(timestamp).toLocaleTimeString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: colors.background,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  myMessageText: {
    color: colors.white,
  },
  otherMessageText: {
    color: colors.text.primary,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    opacity: 0.7,
  },
});