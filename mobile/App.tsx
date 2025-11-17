import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { URL } from './src/constants/api';

export default function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const fetchHello = async () => {
      try {
        const response = await fetch(`${URL}/hello`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        const text = await response.text();
        setMessage(text || 'Received non-JSON response');
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Failed to load message. Make sure the server is running and CORS is properly configured.');
      }
    };
<Text>Open up App.tsx to start working on your app!</Text>
    fetchHello();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
