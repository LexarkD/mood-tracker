import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomTabsNavigator } from './screens/BottomTabs.navigator.tsx';
import { AppProvider } from './App.provider.tsx';
//Redux
import { store } from './store/store.ts';
import { Provider } from 'react-redux';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Provider store={store}>
        <GestureHandlerRootView style={styles.container}>
          <NavigationContainer>
            <BottomTabsNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
