import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useMarkList from '../hooks/useMarkList.ts';
import {
  moodOptions,
  sleepOptions,
  MoodType,
  SleepType,
  MarkEntryType,
} from '../store/slices/markListSlice.ts';
import { checkingTimeout } from '../utils/checkingTimeout.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { FocusableEmojiButton } from './FocusableEmojiButton.tsx';
import { FinalResultScreen } from './FinalResultScreen.tsx';
import { AnimatedSubmitButton } from './AnimatedSubmitButton.tsx';

export const MoodPicker: React.FC = () => {
  const { onAddMarkEntry, markList } = useMarkList();
  // NOTE: selectedMoodMark и selectedSleepMark- хранят выборанную отметку + поддержка анимации выбора отметки
  const [selectedMoodMark, setSelectedMoodMark] = useState<MoodType>();
  const [selectedSleepMark, setSelectedSleepMark] = useState<SleepType>();

  // NOTE: completedEntry - отвечает за отображение FinalResultScreen
  const [completedEntry, setCompletedEntry] = useState<MarkEntryType | null>(
    null,
  );
  // NOTE: Хранит данные о том, прошел ли календарный день с момента последней зписи
  const [isTimeoutOver, setIsTimeoutOver] = useState<boolean>(false);

  // NOTE: кнопка AnimatedSubmitButton может быть доступна, если все значения выбраны
  const isAllMarksPicked = Boolean(selectedMoodMark && selectedSleepMark);

  // NOTE: Утилита содержит логику на проверку истечения таймаута
  const checkingTimeOver = useCallback(
    (currentTime: number) => {
      const lastEntry = markList[0];
      if (!lastEntry) return true;
      return checkingTimeout(lastEntry.timestamp, currentTime);
    },
    [markList],
  );

  // NOTE: Хук запускает интервал- каждую минуту получает текущее время и проверяет истечение таймаута.
  useFocusEffect(
    useCallback(() => {
      setIsTimeoutOver(checkingTimeOver(Date.now()));
      const oneMinute = 60000;
      const intervalId = setInterval(() => {
        setIsTimeoutOver(checkingTimeOver(Date.now()));
      }, oneMinute);
      return () => clearInterval(intervalId);
    }, [checkingTimeOver]),
  );

  const handleSelect = () => {
    // NOTE: Если таймаут истек, значит запись разрешена
    if (isTimeoutOver && selectedMoodMark && selectedSleepMark) {
      const newEntry: MarkEntryType = {
        moodMark: selectedMoodMark,
        sleepMark: selectedSleepMark,
      };
      onAddMarkEntry(newEntry);
      setCompletedEntry(newEntry);
    }
  };

  const handleBack = () => {
    setSelectedMoodMark(undefined);
    setSelectedSleepMark(undefined);
    setCompletedEntry(null);
  };

  // NOTE: isDisabled(отключена = ture), если хотя бы одно из услловий не выполнено
  const isDisabledButton = !isAllMarksPicked || !isTimeoutOver;

  //NOTE: используется pointerEventsStatus, что бы разрешить или запретить события касаний для emoji, взависимости от isEntryAllowed
  const pointerEventsStatus = isTimeoutOver ? 'auto' : 'none';

  // NOTE: окно с итоговой записью и кнопкой возврата.
  if (completedEntry) {
    return (
      <FinalResultScreen
        moodMark={completedEntry.moodMark}
        sleepMark={completedEntry.sleepMark}
        onBack={handleBack}
      />
    );
  }

  // NOTE: Окно выбора опций.
  // NOTE: descriptionText адаптивно уменьшается на маленьких экранах.
  return (
    <View style={styles.pickerContainer}>
      <View>
        <AppText variant="h1" style={styles.header}>
          {isTimeoutOver
            ? 'Take a deep breath. \nHow was your day?'
            : "You've done great today. \nSee you tomorrow!"}
        </AppText>
      </View>
      <View style={[styles.optionsContainer, theme.shadowStyle]}>
        <AppText variant="h1" style={styles.header}>
          How are you feeling today?
        </AppText>
        <View style={styles.optionsRow} pointerEvents={pointerEventsStatus}>
          {moodOptions.map(mood => (
            <View style={styles.emojiContainer} key={mood}>
              <FocusableEmojiButton
                description={mood}
                isSelectOption={selectedMoodMark === mood}
                onPress={() => setSelectedMoodMark(mood)}
              />
              <AppText
                variant="description"
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.75}
              >
                {selectedMoodMark === mood ? mood : ' '}
              </AppText>
            </View>
          ))}
        </View>
      </View>
      <View style={[styles.optionsContainer, theme.shadowStyle]}>
        <AppText variant="h1" style={styles.header}>
          How did you sleep?
        </AppText>
        <View style={styles.optionsRow} pointerEvents={pointerEventsStatus}>
          {sleepOptions.map(sleep => (
            <View style={styles.emojiContainer} key={sleep}>
              <FocusableEmojiButton
                description={sleep}
                isSelectOption={selectedSleepMark === sleep}
                onPress={() => setSelectedSleepMark(sleep)}
              />
              <AppText
                variant="description"
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.75}
              >
                {selectedSleepMark === sleep ? sleep : ' '}
              </AppText>
            </View>
          ))}
        </View>
      </View>
      <AnimatedSubmitButton
        style={styles.submitButton}
        title="CHOOSE"
        disabled={isDisabledButton}
        onSubmit={handleSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    gap: 16,
  },
  header: {
    marginBottom: 8,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colorWhite,
    borderRadius: 12,
  },
  optionsRow: {
    flexDirection: 'row',
  },
  emojiContainer: {
    flex: 1,
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 16,
  },
});
