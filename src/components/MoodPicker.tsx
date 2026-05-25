import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import useMarkList from '../hooks/useMarkList.ts';
import {
  moodOptions,
  sleepOptions,
  MoodType,
  SleepType,
  MarkEntryType,
} from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppHeaderText } from './AppHeaderText.tsx';
import { AppEmoji } from './AppEmoji.tsx';
import { FocusableEmojiButton } from './FocusableEmojiButton.tsx';

// TODO: сделать проверку для "CHOOSE" => handleSelect. Добавить новую запись можно только если после последней записи прошло 24 часа. Добавить окно с оповещением, что в день можно дабвить только одну запись
const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const MoodPicker: React.FC = () => {
  const { onAddMockData, onClearMarkList, onAddMarkEntry } = useMarkList();
  const [selectedMoodMark, setSelectedMoodMark] = useState<MoodType>();
  const [selectedSleepMark, setSelectedSleepMark] = useState<SleepType>();

  // NOTE: completedEntry - отвечает за отображение окна с итоговой записью
  const [completedEntry, setСompletedEntry] = useState<MarkEntryType | null>(
    null,
  );

  // NOTE: allMarksPicked - булевое значение, отвечает за доступность кнопки "CHOOSE".
  const allMarksPicked = Boolean(selectedMoodMark && selectedSleepMark);

  const handleSelect = () => {
    if (selectedMoodMark && selectedSleepMark) {
      const newEntry: MarkEntryType = {
        moodMark: selectedMoodMark,
        sleepMark: selectedSleepMark,
      };
      onAddMarkEntry(newEntry);
      setСompletedEntry(newEntry);
    }
  };

  const handleBack = () => {
    if (selectedMoodMark && selectedSleepMark) {
      setSelectedMoodMark(undefined);
      setSelectedSleepMark(undefined);
      setСompletedEntry(null);
    }
  };

  const buttonAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: allMarksPicked ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: allMarksPicked ? withTiming(1) : 0.8 }],
    }),
    [allMarksPicked],
  );

  // NOTE: окно с итоговой записью и кнопкой возврата.

  if (completedEntry) {
    return (
      <View style={[styles.finalResultContainer, theme.shadowStyle]}>
        <View style={styles.finalResult}>
          <View>
            <AppEmoji
              style={styles.backBoxEmoji}
              description={completedEntry.moodMark}
              size={theme.iconSize.large}
            />
            <AppText style={styles.descriptionText} variant="bold">
              {selectedMoodMark}
            </AppText>
          </View>
          <View>
            <AppEmoji
              style={styles.backBoxEmoji}
              description={completedEntry.sleepMark}
              size={theme.iconSize.large}
            />
            <AppText style={styles.descriptionText} variant="bold">
              {selectedSleepMark}
            </AppText>
          </View>
        </View>

        <Pressable style={styles.button} onPress={handleBack}>
          <AppText style={styles.buttonText} variant="bold">
            BACK
          </AppText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.pickerContainer}>
      <View style={styles.serviceContainer}>
        <Pressable hitSlop={16} onPress={onClearMarkList}>
          <AppText style={styles.serviceText} variant="light">
            Clear history
          </AppText>
        </Pressable>
        <Pressable hitSlop={16} onPress={onAddMockData}>
          <AppText style={styles.serviceText} variant="light">
            Add Mock Data
          </AppText>
        </Pressable>
      </View>
      <View style={[styles.optionsContainer, theme.shadowStyle]}>
        <AppHeaderText style={styles.header} variant="bold">
          How are you feeling today?
        </AppHeaderText>
        <View style={styles.optionsRow}>
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
      <View style={[styles.optionsContainer, theme.shadowStyle]}>
        <AppHeaderText style={styles.header} variant="bold">
          How did you sleep?
        </AppHeaderText>
        <View style={styles.optionsRow}>
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
      <AnimatedPressable
        style={[styles.button, buttonAnimatedStyle]}
        onPress={handleSelect}
      >
        <AppText style={styles.buttonText} variant="bold">
          CHOOSE
        </AppText>
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
  },
  optionsContainer: {
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
  },
  finalResult: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  finalResultContainer: {
    height: '30%',
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionText: {
    color: theme.colorBrown,
    fontSize: 15,
    textAlign: 'center',
  },
  header: {
    color: theme.colorBrown,
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: theme.colorYellow,
    width: 150,
    borderRadius: 12,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: theme.colorBrown,
    textAlign: 'center',
  },
  backBoxEmoji: {
    alignSelf: 'center',
    marginTop: 25,
  },
  serviceContainer: {
    flexDirection: 'row',
  },
  serviceText: {
    color: theme.colorBrown,
  },
});
