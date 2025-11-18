import { useLocalSearchParams } from 'expo-router';
import ProjectDetailsScreen from '../../screens/ProjectDetailsScreen';

export default function ProjectDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ProjectDetailsScreen />;
}
