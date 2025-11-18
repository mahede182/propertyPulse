import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import colors from '../../constants/colors';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useLanguage } from '../../hooks/useLang';
import { login } from '../../api/auth';
import { storeToken } from '../../api/client';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const { access_token, id } = await login({ email, password });
      
      if (access_token) {
        storeToken(access_token);
        router.replace({
          pathname: '/(tabs)/projects',
          params: { id },
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      Alert.alert('Error', 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('auth.signIn')}</Text>
        <Text style={styles.subtitle}>{t('auth.signInSubtitle')}</Text>
        <Input
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Input
          label={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button 
          title={t('auth.signIn')} 
          onPress={handleSignIn} 
        />

        <TouchableOpacity onPress={() => router.replace('(auth)/signup')}>
          <Text style={styles.linkText}>
            {t('auth.dontHaveAccount')} <Text style={styles.linkTextAccent}>{t('auth.signUp')}</Text>
          </Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  linkText: {
  marginTop: 12,
  fontSize: 13,
  color: colors.text.secondary,
  textAlign: 'center',
},
linkTextAccent: {
  color: colors.button.primary,
  fontWeight: '600',
},
});
