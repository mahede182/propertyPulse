import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '../components/Button';
import colors from '../constants/colors';
import { Card} from '../components/Card';
import Header from '../components/Header';
import { Avatar } from '../components/Avatar';
import { useLanguage } from '../hooks/useLang';
import { getUser, User } from '../api/auth';
import { getToken } from '../api/client';
import { getProjects, Project } from '../api/project';

export default function ProjectScreen() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<User>({ name: '', email: '', avatar: 'JD' });
  const { t } = useLanguage();
  const {id} = useLocalSearchParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // const userData = await getUser(id);
        // if (userData) {
        //   setUser({
        //     name: userData.name || 'User',
        //     email: userData.email || '',
        //     avatar: userData.name?.charAt(0) || 'U'
        //   });
        // }

        const projectsData = await getProjects();

        if (projectsData) {
          setProjects(projectsData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleAddProject = () => {
    router.push('/(tabs)/projects/add');
  };

  const handleProjectPress = (projectId: string) => {
    router.push(`/(tabs)/projects/${projectId}`);
  };

  return (
    <View style={styles.container}>
      <Header title={t('common.projects')} />
      <Avatar name={"Mahede"} email={"m@gmail.com"} avatar={"MH"} />
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            location={item.description}
            date={item.updatedAt}
            onPress={() => handleProjectPress(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Button 
          title={t('common.addNewProject')}
          onPress={handleAddProject} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    marginTop: 32,
  },
  listContent: {
    paddingBottom: 24,
  },
  footer: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
});