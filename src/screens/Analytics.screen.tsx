import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppPieChart } from '../components/AppPieChart.tsx';
import { theme } from '../constants/theme.ts';

// TODO: Ориентация будет залочена на вертикальной. Поэтому надо будет скорректирвоать SafeAreaView edges
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
    justifyContent: 'center',
    backgroundColor: theme.colorGreen,
  },
});
