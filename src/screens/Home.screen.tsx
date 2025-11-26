import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { MoodPicker } from '../components/MoodPicker.tsx';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?q=80&w=2366&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export const Home: React.FC = () => {
  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.container}>
      <MoodPicker />
    </ImageBackground>
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
