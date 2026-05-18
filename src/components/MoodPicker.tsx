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
} from '../store/slices/markListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppHeaderText } from './AppHeaderText.tsx';
import { AppEmoji } from './AppEmoji.tsx';
import { FocusableEmojiButton } from './FocusableEmojiButton.tsx';

//TODO: сделать проверку для "CHOOSE" => handleSelect. Добавить новую запись можно только если после последней записи прошло 24 часа. Добавить окно с оповещением, что в день можно дабвить только одну запись
const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const MoodPicker: React.FC = () => {
  const { onAddMarkEntry } = useMarkList();
  const [selectedMoodMark, setSelectedMoodMark] = useState<MoodType>();
  const [selectedSleepMark, setSelectedSleepMark] = useState<SleepType>();
  // NOTE: hasSelected - по сути отвечает за отображение окна backBox.
  // TODO: подумать, как семантически правильно назвать этот state. Назвать его в соостветствии с тем, для чего он нужен- отображение backBox (isRenderBackBox)?
  const [hasSelected, setHasSelected] = useState(false);
  // NOTE: chosenMood - булевое значение, отвечает за доступность кнопки "CHOOSE".
  // TODO: подумать, как семантически правильно назвать эту переменную. Ее имя должно быть связано с тем, что она содержит булево значение -выбраны или нет опции(кпримеру isChosenMoods)? Или имя должно отображать, для чего нужна эта переменная -доступность кнопки (кпримеру isActivityChooseButton)?
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

  const buttonAnimatedStyle = useAnimatedStyle(
    () => ({
      opacity: chosenMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: chosenMood ? withTiming(1) : 0.8 }],
    }),
    [chosenMood],
  );

  // NOTE: окно с итоговым выбором и кнопкой возврата.
  // TODO: На итоговом окне должны быть показаны все выбраные опции. Анимировать их
  // TODO: тройные логические конструкции - шляпа. Тут можно сделать проще
  if (hasSelected && selectedMoodMark && selectedSleepMark) {
    return (
      <View style={styles.backBoxContainer}>
        <AppEmoji
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
    <View style={styles.pickerContainer}>
      <View style={styles.optionsContainer}>
        <AppHeaderText style={styles.header} variant="bold">
          How are you right now?
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
      <View style={styles.optionsContainer}>
        <AppHeaderText style={styles.header} variant="bold">
          How are you right now?
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
      <ReanimatedPressable
        style={[styles.button, buttonAnimatedStyle]}
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
  pickerContainer: {
    flex: 1,
  },
  optionsContainer: {
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  backBoxContainer: {
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 10,
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
    backgroundColor: theme.colorOrange,
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
  backBoxEmoji: {
    alignSelf: 'center',
    marginTop: 25,
  },
});
