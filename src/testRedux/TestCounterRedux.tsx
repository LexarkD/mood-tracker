import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AppText } from '../components/AppText.tsx';
import { theme } from '../theme.ts';
import { useAppSelector, useAppDispatch } from '../hooks/redux.hooks.ts';
import { decrement, increment, incrementByAmount } from './testSlice.ts';
import { selectTestCounter } from './testSlice.ts';

export const TestCounterRedux: React.FC = () => {
  const count = useAppSelector(selectTestCounter);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(incrementByAmount(2))}
        >
          <AppText style={styles.buttonText} variant="bold">
            add 2
          </AppText>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(incrementByAmount(-2))}
        >
          <AppText style={styles.buttonText} variant="bold">
            remove 2
          </AppText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => dispatch(increment())}>
          <AppText style={styles.buttonText} variant="bold">
            increment
          </AppText>
        </Pressable>
        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <AppText style={styles.buttonText} variant="bold">
            decrement
          </AppText>
        </Pressable>
      </View>
      <View>
        <AppText style={styles.heading} variant="bold">
          {count}
        </AppText>
      </View>
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
    height: 400,
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
