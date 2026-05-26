import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
import { checkingTimeout } from '../utils/checkingTimeout.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppHeaderText } from './AppHeaderText.tsx';
import { AppEmoji } from './AppEmoji.tsx';
import { FocusableEmojiButton } from './FocusableEmojiButton.tsx';

const AnimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const MoodPicker: React.FC = () => {
  const { onAddMockData, onClearMarkList, onAddMarkEntry, markList } =
    useMarkList();
  // NOTE: хранят сделай выбор + поддержка анимации выбора
  const [selectedMoodMark, setSelectedMoodMark] = useState<MoodType>();
  const [selectedSleepMark, setSelectedSleepMark] = useState<SleepType>();

  // NOTE: completedEntry - отвечает за отображение окна с итоговой записью
  const [completedEntry, setCompletedEntry] = useState<MarkEntryType | null>(
    null,
  );
  // NOTE: Нужен для обновления времени и адекватной проверке isEntryAllowed при разных сценариях поведения прользователя
  const [currentTime, setCurrentTime] = useState(Date.now());

  // NOTE: allMarksPicked - булевое значение, отвечает за доступность кнопки "CHOOSE".
  const allMarksPicked = Boolean(selectedMoodMark && selectedSleepMark);

  // NOTE: Тут была решена интересная проблема сценария поведения.
  // NOTE: Получаю новое время, даже если приложение не было закрыто, но пользователь перешел на другую вкладку или сворачивал приложение.
  useFocusEffect(
    useCallback(() => {
      setCurrentTime(Date.now());
      // NOTE: Вешаю слушатель на состояние приложения, чтоб обновить время, если пользователь свернет приложение на этой вкладке. Получаю AppState -> active, когда приложение возвращается из фона.
      const subscription = AppState.addEventListener(
        'change',
        (nextAppState: AppStateStatus) => {
          if (nextAppState === 'active') {
            setCurrentTime(Date.now());
          }
        },
      );
      // NOTE: Фукнция очистки удалит слушатель, если пользователь перешел на другую вкладку. В другом случае- OS убьет слушатель, когда убьет процесс, или когда пользователь совершит Hard Close.
      return () => {
        subscription.remove();
      };
    }, []),
  );

  // NOTE: isEntryAllowed - проверяет, можно ли делать новую запись.
  const isEntryAllowed = useMemo(() => {
    const lastEntry = markList[0];
    // NOTE: Если еще ни одной записи не сделано, новая запись сразу разрешена.
    if (!lastEntry) return true;
    // NOTE: Вычисляю, прошел ли таймаут в 1 сутки.
    return checkingTimeout(lastEntry.timestamp, currentTime);
  }, [markList, currentTime]);

  const handleSelect = () => {
    // NOTE: Если таймаут истек, значит запись разрешена
    if (isEntryAllowed && selectedMoodMark && selectedSleepMark) {
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

  // NOTE: Анимация кнопки сработает только если эмоции выбраны и запись разрешена
  const buttonAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity:
        allMarksPicked && isEntryAllowed ? withTiming(1) : withTiming(0.5),
      transform: [
        { scale: allMarksPicked && isEntryAllowed ? withTiming(1) : 0.8 },
      ],
    }),
    [allMarksPicked, isEntryAllowed],
  );
  //NOTE: используется pointerEventsStatus, что б разрешить или запретить события касаний для emoji, взависимостми от isEntryAllowed
  const pointerEventsStatus = isEntryAllowed ? 'auto' : 'none';

  // NOTE: окно с итоговой записью и кнопкой возврата.
  if (completedEntry) {
    return (
      <View style={[styles.finalResultContainer, theme.shadowStyle]}>
        <View>
          <AppHeaderText style={styles.headerFinalResult} variant="bold">
            Thank you for sharing!
          </AppHeaderText>
        </View>
        <View style={styles.finalResult}>
          <View>
            <AppEmoji
              style={styles.backBoxEmoji}
              description={completedEntry.moodMark}
              size={theme.iconSize.large}
            />
            <AppText style={styles.descriptionText} variant="bold">
              {completedEntry.moodMark}
            </AppText>
          </View>
          <View>
            <AppEmoji
              style={styles.backBoxEmoji}
              description={completedEntry.sleepMark}
              size={theme.iconSize.large}
            />
            <AppText style={styles.descriptionText} variant="bold">
              {completedEntry.sleepMark}
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
  // NOTE: Окно выбора опций.
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
      <View>
        <AppHeaderText style={styles.header} variant="bold">
          {isEntryAllowed
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
        <View style={styles.optionsRow} pointerEvents={pointerEventsStatus}>
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
        disabled={!allMarksPicked || !isEntryAllowed}
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

  finalResultContainer: {
    height: '30%',
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
  },
  finalResult: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  headerFinalResult: {
    color: theme.colorBrown,
    fontSize: 20,
    letterSpacing: 1,
    textAlign: 'center',
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
    marginHorizontal: 20,
    marginTop: 25,
  },
  serviceContainer: {
    flexDirection: 'row',
  },
  serviceText: {
    color: theme.colorBrown,
  },
});

// TODO(refactor): Вынести экран с финальным результатом отдельным компонентом.
//FinalResultScreen.tsx
// if (completedEntry) {
//     return (
//       <FinalResultScreen
//         moodMark={completedEntry.moodMark}
//         sleepMark={completedEntry.sleepMark}
//         onBack={handleBack}
//       />
//     );
//   }

// type FinalResultScreenProps = {
//   moodMark: MoodType;
//   sleepMark: SleepType;
//   onBack: () => void;
// };

// export const SuccessScreen: React.FC<FinalResultScreenProps> = ({
//   moodMark,
//   sleepMark,
//   onBack,
// }) => (
//   <View style={[styles.finalResultContainer, theme.shadowStyle]}>
//     <View>
//       <AppHeaderText style={styles.headerFinalResult} variant="bold">
//         Thank you for sharing!
//       </AppHeaderText>
//     </View>
//     <View style={styles.finalResult}>
//       <View>
//         <AppEmoji
//           style={styles.backBoxEmoji}
//           description={completedEntry.moodMark}
//           size={theme.iconSize.large}
//         />
//         <AppText style={styles.descriptionText} variant="bold">
//           {completedEntry.moodMark}
//         </AppText>
//       </View>
//       <View>
//         <AppEmoji
//           style={styles.backBoxEmoji}
//           description={completedEntry.sleepMark}
//           size={theme.iconSize.large}
//         />
//         <AppText style={styles.descriptionText} variant="bold">
//           {completedEntry.sleepMark}
//         </AppText>
//       </View>
//     </View>
//     <Pressable style={styles.button} onPress={handleBack}>
//       <AppText style={styles.buttonText} variant="bold">
//         BACK
//       </AppText>
//     </Pressable>
//   </View>
// );
