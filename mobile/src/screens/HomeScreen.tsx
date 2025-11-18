import { router } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Go to Projects" onPress={() => router.push('/project')} />
    </View>
  );
};

export default HomeScreen;
