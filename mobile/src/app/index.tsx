import { t } from 'i18next';
import { StyleSheet, Text, View } from 'react-native';
// import { useState, useEffect } from 'react';
// import { URL } from '../constants/api';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>{t('common.realEstate')}</Text>
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