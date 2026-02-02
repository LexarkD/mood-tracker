import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AppText } from './AppText.tsx';
import { theme } from '../theme.ts';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hooks.ts';
import { decrement, increment } from '../store/moodSlice.ts';

export const TestCounterRedux: React.FC = () => {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => dispatch(increment())}>
        <AppText style={styles.buttonText} variant="bold">
          increment
        </AppText>
      </Pressable>
      <View>
        <AppText style={styles.heading} variant="bold">
          {count}
        </AppText>
      </View>
      <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
        <AppText style={styles.buttonText} variant="bold">
          decrement
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.colorPurple,
    backgroundColor: 'rgba(0,0,0,0.2)',
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 230,
  },
  heading: {
    color: theme.colorWhite,
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
  },
});
