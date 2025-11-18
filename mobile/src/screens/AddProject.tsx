import { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import colors from '../constants/colors';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { createProject } from '../api/project';

export default function AddProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddProject = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Project name is required');
      return;
    }

    try {
      setIsLoading(true);
      const newProject = await createProject({ 
        name: name.trim(),
        description: description.trim()
      });

      console.log('New project created:', newProject);
      
      if (newProject) {
        router.replace('/(tabs)/projects');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      Alert.alert('Error', 'Failed to create project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Add New Project</Text>
        <Text style={styles.subtitle}>Enter project details below</Text>
        
        <Input
          label="Project Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter project name"
          autoCapitalize="words"
          returnKeyType="next"
          disabled={isLoading}
          onSubmitEditing={() => {
            // Focus next input if needed
          }}
        />
        
        <Input
          label="Description (Optional)"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter project description"
          multiline
          numberOfLines={3}
          style={styles.descriptionInput}
          textAlignVertical="top"
          disabled={isLoading}
        />

        <Button 
          title={isLoading ? 'Creating...' : 'Create Project'} 
          onPress={handleAddProject} 
          disabled={isLoading}
          style={styles.button}
        />
        
        <Button 
          title="Cancel" 
          onPress={() => router.back()} 
          variant="outline"
          disabled={isLoading}
          style={styles.cancelButton}
        />
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
  button: {
    marginTop: 24,
  },
  cancelButton: {
    marginTop: 12,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
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
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
});