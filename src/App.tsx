import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator.tsx';
import { AppProvider } from './App.provider.tsx';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <BottomTabsNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
