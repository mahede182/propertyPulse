import { useLocalSearchParams } from 'expo-router';
import SingleChat from '../../screens/SingleChat';

export default function ChatDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <SingleChat />;
}
