import React from 'react';
import { View, StyleSheet, Text, ViewStyle } from 'react-native';
import colors from '../constants/colors';

interface ContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  style?: ViewStyle;
}

export const Container = ({ 
  children, 
  title, 
  subtitle, 
  style 
}: ContainerProps) => (
  <View style={[styles.container, style]}>
    {title && <Text style={styles.title}>{title}</Text>}
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    <View style={styles.content}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  content: {
    flex: 1,
    width: '100%',
  },
});