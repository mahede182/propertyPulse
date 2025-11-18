import React from 'react';
import { TextInput, TextInputProps, Text, View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input = ({ 
  label, 
  error, 
  style, 
  ...props 
}: InputProps) => (
  <View style={[styles.fieldGroup, style]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[
        styles.input,
        error ? styles.inputError : null,
      ]}
      placeholderTextColor={colors.text.muted}
      {...props}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  fieldGroup: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text.primary,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
});