import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppPieChart } from '../components/AppPieChart.tsx';

export const Analytics: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <AppPieChart />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
