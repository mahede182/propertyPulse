import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import colors from '../constants/colors';
import { useEffect, useState } from 'react';
import { getToken } from '../api/client';
import { getUser } from '../api/auth';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = getToken();
        if (token) {
          const user = await getUser(token);
          if (user) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return isLoggedIn ? (
    <Redirect href="/(tabs)/projects" />
  ) : (
    <Redirect href="/(auth)/signin" />
  );
}