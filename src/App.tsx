import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './store/store.ts';
import { persistor } from './store/store.ts';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.container}>
            <NavigationContainer>
              <BottomTabsNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
//TODO: SelfTracker новое имя
//TODO: лишние зависимости
//npm uninstall
// "react-native-paper": "^5.15.2",
// "react-native-linear-gradient": "^2.8.3",
// "@react-native/new-app-screen": "0.81.4",
