import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useMarkList from '../hooks/useMarkList.ts';
import {
  MARK_OPTIONS,
  MoodType,
  SleepType,
  MarkEntryType,
} from '../store/slices/markListSlice.ts';
import { checkingTimeout } from '../utils/checkingTimeout.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { FocusableEmojiButtonMemo } from './FocusableEmojiButton.tsx';
import { FinalResultMark } from './FinalResultMark.tsx';
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
  // NOTE: Хранит данные о том, прошел ли календарный день с момента последней записи
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

  const handleSelect = useCallback(() => {
    // NOTE: Если таймаут истек, значит запись разрешена
    if (isTimeoutOver && selectedMoodMark && selectedSleepMark) {
      const newEntry: MarkEntryType = {
        moodMark: selectedMoodMark,
        sleepMark: selectedSleepMark,
      };
      onAddMarkEntry(newEntry);
      setCompletedEntry(newEntry);
    }
  }, [isTimeoutOver, selectedMoodMark, selectedSleepMark, onAddMarkEntry]);

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
      <FinalResultMark
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
      <View style={styles.contentContainer}>
        <AppText variant="h1" style={styles.header}>
          {isTimeoutOver
            ? 'Take a deep breath.\nHow was your day?'
            : "You've done great today.\nSee you tomorrow!"}
        </AppText>
        <View style={styles.optionsContainer}>
          <AppText variant="h1" style={styles.header}>
            How are you feeling today?
          </AppText>
          <View style={styles.optionsRow} pointerEvents={pointerEventsStatus}>
            {MARK_OPTIONS.moodMark.map(mood => (
              <View style={styles.emojiContainer} key={mood}>
                <FocusableEmojiButtonMemo
                  description={mood}
                  isSelectOption={selectedMoodMark === mood}
                  onSelect={setSelectedMoodMark}
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
        <View style={styles.optionsContainer}>
          <AppText variant="h1" style={styles.header}>
            How did you sleep?
          </AppText>
          <View style={styles.optionsRow} pointerEvents={pointerEventsStatus}>
            {MARK_OPTIONS.sleepMark.map(sleep => (
              <View style={styles.emojiContainer} key={sleep}>
                <FocusableEmojiButtonMemo
                  description={sleep}
                  isSelectOption={selectedSleepMark === sleep}
                  onSelect={setSelectedSleepMark}
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
      </View>
      <View style={styles.footerContainer}>
        <AnimatedSubmitButton
          title="CHOOSE"
          disabled={isDisabledButton}
          onSubmit={handleSelect}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: theme.spacing.m,
  },
  header: {
    paddingBottom: theme.spacing.s,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: theme.spacing.s,
    minHeight: 160,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.COLOR_CONFIG_UI.cardBackground,
    borderRadius: 12,
    ...theme.SHADOW,
  },
  optionsRow: {
    flex: 1,
    flexDirection: 'row',
  },
  emojiContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing.m,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
  },
});
