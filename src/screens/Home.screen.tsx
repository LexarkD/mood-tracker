import React from 'react';

import { StyleSheet, View } from 'react-native';

import { MoodPicker } from '../components/MoodPicker.tsx';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <MoodPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

// мне не нравится порядок лога- новые записи появляются в внизу списка, а не вверху
// Есть сомнения в эффективности useCallback, так как у меня перерисовываются все компоненты при любом взаимодействии.
