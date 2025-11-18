import { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import colors from '../../constants/colors';
import { createUser, login } from '../../api/auth';
import { useLanguage } from '../../hooks/useLang';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      await createUser({
        name,
        email,
        password,
      });
      const {access_token} = await login({email, password});
      console.log(access_token,"access_token")
      if(access_token){
        router.replace('/(tabs)/projects') 
      }
      
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert(
        t('auth.signupError'),
        error instanceof Error ? error.message : t('auth.somethingWentWrong')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          autoCapitalize="words"
        />

        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button 
          title="Sign Up" 
          onPress={handleSignUp}
          disabled={isLoading}
        />
        <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
             <TouchableOpacity onPress={() => router.replace('/(auth)/signin')}>
             <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 24,
    },
    card: {
      width: '100%',
      backgroundColor: colors.card,
      borderRadius: 24,
      padding: 24,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
      elevation: 4,
    },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  footerText: {
    color: colors.text.secondary,
    fontSize: 13,
  },
  signInLink: {
    color: colors.button.primary,
    fontWeight: '600',
  },
});