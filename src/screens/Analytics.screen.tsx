import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TestCounterRedux } from '../components/TestCounterRedux';
export const Analytics: React.FC = () => {
  return (
    <View style={styles.container}>
      <TestCounterRedux />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
