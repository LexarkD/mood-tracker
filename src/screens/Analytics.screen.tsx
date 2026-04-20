import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPieChart } from '../components/AppPieChart.tsx';

export const Analytics: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <View>
        <AppPieChart />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
