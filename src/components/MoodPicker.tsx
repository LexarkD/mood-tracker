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
import { AppHeaderText } from './AppHeaderText.tsx';
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
        <AppHeaderText style={styles.header} variant="bold">
          {isTimeoutOver
            ? 'Take a deep breath. \nHow was your day?'
            : "You've done great today. \nSee you tomorrow!"}
        </AppHeaderText>
      </View>
      <View style={[styles.optionsContainer, theme.shadowStyle]}>
        <AppHeaderText style={styles.header} variant="bold">
          How are you feeling today?
        </AppHeaderText>
        <View style={styles.optionsRow} pointerEvents={pointerEventsStatus}>
          {moodOptions.map(mood => (
            <View style={styles.emojiContainer} key={mood}>
              <FocusableEmojiButton
                description={mood}
                isSelectOption={selectedMoodMark === mood}
                onPress={() => setSelectedMoodMark(mood)}
              />
              <AppText
                style={styles.descriptionText}
                variant="bold"
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
        <AppHeaderText style={styles.header} variant="bold">
          How did you sleep?
        </AppHeaderText>
        <View style={styles.optionsRow} pointerEvents={pointerEventsStatus}>
          {sleepOptions.map(sleep => (
            <View style={styles.emojiContainer} key={sleep}>
              <FocusableEmojiButton
                description={sleep}
                isSelectOption={selectedSleepMark === sleep}
                onPress={() => setSelectedSleepMark(sleep)}
              />
              <AppText
                style={styles.descriptionText}
                variant="bold"
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
  },
  optionsContainer: {
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emojiContainer: {
    flex: 1,
    alignItems: 'center',
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
});

// NOTE: Этот способ получения currentTime слишком замороченный, хотя и не вызывает лишних рендеров
// // NOTE: Получаю новое время, даже если приложение не было закрыто, но пользователь перешел на другую вкладку или сворачивал приложение.
// useFocusEffect(
//   useCallback(() => {
//     setCurrentTime(Date.now());
//     // NOTE: Вешаю слушатель на состояние приложения, чтоб обновить время, если пользователь свернет приложение на этой вкладке. Получаю AppState -> active, когда приложение возвращается из фона.
//     const subscription = AppState.addEventListener(
//       'change',
//       (nextAppState: AppStateStatus) => {
//         if (nextAppState === 'active') {
//           setCurrentTime(Date.now());
//         }
//       },
//     );
//     // NOTE: Фукнция очистки удалит слушатель, если пользователь перешел на другую вкладку. В другом случае- OS убьет слушатель, когда убьет процесс, или когда пользователь совершит Hard Close.
//     return () => {
//       subscription.remove();
//     };
//   }, []),
// );

// NOTE: Способ с интервалом проще. Но такая реализация каждую минуту вызывает ненужный ререндер.
// NOTE: Запускаю интервал, что бы получать currentTime.
// useFocusEffect(
//   useCallback(() => {
//     setCurrentTime(Date.now());
//     const oneMinute = 60000;
//     const intervalId = setInterval(() => {
//       setCurrentTime(Date.now());
//     }, oneMinute);

//     return () => clearInterval(intervalId);
//   }, []),
// );

//   // NOTE: isTimeoutOver - проверяет, наступил ли следующий день и может ли быть доступен интерфейс.
// const isTimeoutOver2 = useMemo(() => {
//   const lastEntry = markList[0];
//   // NOTE: Если еще ни одной записи не сделано, новая запись сразу разрешена.
//   if (!lastEntry) return true;
//   // NOTE: Вычисляю, прошел ли таймаут в 1 сутки.
//   return checkingTimeout(lastEntry.timestamp, currentTime);
// }, [markList, currentTime]);
