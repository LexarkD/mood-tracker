import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../components/AppText.tsx';

export const Analytics: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppText>Analytics</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
