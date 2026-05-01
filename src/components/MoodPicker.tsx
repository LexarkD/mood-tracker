import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import useMoodList from '../hooks/useMoodList.ts';
import { moodOptions, MoodType } from '../store/slices/moodListSlice.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from './AppText.tsx';
import { AppHeaderText } from './AppHeaderText.tsx';
import { AppMoodEmoji } from './AppMoodEmoji.tsx';
import { FocusableEmojiButton } from './FocusableEmojiButton.tsx';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

export const MoodPicker: React.FC = () => {
  const { onAddMood } = useMoodList();
  const [selectedMood, setSelectedMood] = useState<MoodType>();
  const [hasSelected, setHasSelected] = useState(false);
  const chosenMood = Boolean(selectedMood);

  const handleSelect = () => {
    if (selectedMood) {
      onAddMood(selectedMood);
      setHasSelected(true);
    }
  };

  const handleBack = () => {
    if (selectedMood) {
      setSelectedMood(undefined);
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

  if (hasSelected && selectedMood) {
    return (
      <View style={styles.container}>
        <AppMoodEmoji
          style={styles.backBoxEmoji}
          description={selectedMood}
          size={theme.iconSize.large}
        />
        <AppText style={styles.descriptionText} variant="bold">
          {selectedMood}
        </AppText>
        <Pressable style={styles.button} onPress={handleBack}>
          <AppText style={styles.buttonText} variant="bold">
            BACK
          </AppText>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeaderText style={styles.heading} variant="bold">
        How are you right now?
      </AppHeaderText>
      <View style={styles.moodList}>
        {moodOptions.map(mood => (
          <View key={mood}>
            <FocusableEmojiButton
              mood={mood}
              selectedMood={selectedMood === mood}
              onPress={() => setSelectedMood(mood)}
            />
            <AppText style={styles.descriptionText} variant="bold">
              {selectedMood === mood ? mood : ' '}
            </AppText>
          </View>
        ))}
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
    backgroundColor: theme.colorWhite,
    margin: 10,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'space-between',
    height: 230,
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
