import React from 'react';
import { StyleSheet } from 'react-native';
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
        <GestureHandlerRootView style={styles.container}>
          <NavigationContainer>
            <BottomTabsNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// PersistGate - контролирует отрисовку. Отрисовка начнется тогда, когда данные вернутся из async storage.
// Параметр loading - можно задать, что я буду видеть, пока данные загружаются с async storage.
