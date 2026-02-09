import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { theme } from '../theme.ts';
import { AppText } from './AppText.tsx';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks.ts';
import { addMood } from '../store/moodListSlice.ts';
import {
  setSelectedMoodUI,
  setHasSelectedUI,
} from '../store/moodPickerUISlice.ts';
import {
  selectSelectedOptionUI,
  selectHasSelectedOptionUI,
} from '../store/moodPickerUISlice.ts';
import type { Mood } from '../store/moodListSlice.ts';

const imageSrc = require('../../assets/butterflies.png');

const moodOptions: Mood[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedMood = useAppSelector(selectSelectedOptionUI);
  const hasSelected = useAppSelector(selectHasSelectedOptionUI);

  const handleSelect = () => {
    if (selectedMood) {
      dispatch(addMood(selectedMood));
      dispatch(setSelectedMoodUI(undefined));
      dispatch(setHasSelectedUI(true));
    }
  };

  const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : 0.8 }],
    }),
    [selectedMood],
  );

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} style={styles.image} />
        <Pressable
          style={styles.button}
          onPress={() => dispatch(setHasSelectedUI(false))}
        >
          <AppText style={styles.buttonText} variant="bold">
            Back
          </AppText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.heading} variant="bold">
        How are you right now?
      </AppText>
      <View style={styles.moodList}>
        {moodOptions.map(option => (
          <View key={option.emoji}>
            <Pressable
              onPress={() => dispatch(setSelectedMoodUI(option))}
              style={[
                styles.moodItem,
                option.emoji === selectedMood?.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}
            >
              <AppText style={styles.moodText}>{option.emoji}</AppText>
            </Pressable>
            <AppText style={styles.descriptionText} variant="bold">
              {selectedMood?.emoji === option.emoji ? option.description : ' '}
            </AppText>
          </View>
        ))}
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}
      >
        <AppText style={styles.buttonText} variant="bold">
          Choose
        </AppText>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  descriptionText: {
    color: theme.colorPurple,
    fontSize: 10,
    textAlign: 'center',
  },
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
  image: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
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

//считаю, что список эмоций(ряд с эмодзи), должен быть в отдельном компоненте- сейчас он мапится нутри верстки.
//считаю, что логику стилизации <Pressable> эмоции (отрисовка нажатия на эмоджи), нужно вынести отдельно от верстки.
