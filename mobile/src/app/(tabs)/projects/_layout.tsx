import { Stack } from 'expo-router';

export default function ProjectsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ 
          headerShown: false,
          title: 'Projects' 
        }}
      />
      <Stack.Screen 
        name="add" 
        options={{ 
          title: 'Add Project',
          headerShown: false,
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}