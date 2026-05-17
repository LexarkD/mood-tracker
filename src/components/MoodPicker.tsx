import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import useMoodList from '../hooks/useMoodList.ts';
import {
  moodOptions,
  sleepOptions,
  MoodType,
  SleepType,
} from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppHeaderText } from './AppHeaderText.tsx';
import { AppMoodEmoji } from './AppMoodEmoji.tsx';
import { FocusableEmojiButton } from './FocusableEmojiButton.tsx';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const MoodPicker: React.FC = () => {
  const { onAddMarkEntry } = useMoodList();
  const [selectedMoodMark, setSelectedMoodMark] = useState<MoodType>();
  const [selectedSleepMark, setSelectedSleepMark] = useState<SleepType>();
  const [hasSelected, setHasSelected] = useState(false);
  const chosenMood = Boolean(selectedMoodMark && selectedSleepMark);

  const handleSelect = () => {
    if (selectedMoodMark && selectedSleepMark) {
      onAddMarkEntry({
        moodMark: selectedMoodMark,
        sleepMark: selectedSleepMark,
      });
      setHasSelected(true);
    }
  };

  const handleBack = () => {
    if (selectedMoodMark && selectedSleepMark) {
      setSelectedMoodMark(undefined);
      setSelectedSleepMark(undefined);
      setHasSelected(false);
    }
  };

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: chosenMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: chosenMood ? withTiming(1) : 0.8 }],
    }),
    [chosenMood],
  );

  if (hasSelected && selectedMoodMark) {
    return (
      <View style={styles.optionsContainer}>
        <AppMoodEmoji
          style={styles.backBoxEmoji}
          description={selectedMoodMark}
          size={theme.iconSize.large}
        />
        <AppText style={styles.descriptionText} variant="bold">
          {selectedMoodMark}
        </AppText>
        <Pressable style={styles.button} onPress={handleBack}>
          <AppText style={styles.buttonText} variant="bold">
            BACK
          </AppText>
        </Pressable>
      </View>
    );
  }
  //TODO: придумать другие подписи - хедеры для пикеров
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <AppHeaderText style={styles.heading} variant="bold">
          How are you right now?
        </AppHeaderText>
        <View style={styles.moodList}>
          {moodOptions.map(mood => (
            <View key={mood}>
              <FocusableEmojiButton
                description={mood}
                isSelectOption={selectedMoodMark === mood}
                onPress={() => setSelectedMoodMark(mood)}
              />
              <AppText style={styles.descriptionText} variant="bold">
                {selectedMoodMark === mood ? mood : ' '}
              </AppText>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <AppHeaderText style={styles.heading} variant="bold">
          How are you right now?
        </AppHeaderText>
        <View style={styles.moodList}>
          {sleepOptions.map(sleep => (
            <View key={sleep}>
              <FocusableEmojiButton
                description={sleep}
                isSelectOption={selectedSleepMark === sleep}
                onPress={() => setSelectedSleepMark(sleep)}
              />
              <AppText style={styles.descriptionText} variant="bold">
                {selectedSleepMark === sleep ? sleep : ' '}
              </AppText>
            </View>
          ))}
        </View>
      </View>
      <ReanimatedPressable
        style={[styles.button, buttonStyle]}
        onPress={handleSelect}
      >
        <AppText style={styles.buttonText} variant="bold">
          CHOOSE
        </AppText>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  backBoxEmoji: {
    alignSelf: 'center',
    marginTop: 25,
  },
  button: {
    backgroundColor: theme.colorOrange,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  container: {
    flex: 1,
  },
  optionsContainer: {
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    // height: 230,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionText: {
    color: theme.colorBrown,
    fontSize: 15,
    textAlign: 'center',
  },
  image: {
    height: 100,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  heading: {
    color: theme.colorBrown,
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: theme.colorWhite,
    textAlign: 'center',
  },
});
