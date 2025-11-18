import React from 'react';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

const ProjectScreen = () => {
  return (
    <View>
      <Text>ProjectScreen</Text>
      <Button title="Go to Chat" onPress={() => router.push('/chat')} />
    </View>
  );
};

export default ProjectScreen;
