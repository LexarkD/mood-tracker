import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPieChart } from '../components/AppPieChart.tsx';

export const Analytics: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
      <ScrollView>
        <View>
          <AppPieChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
