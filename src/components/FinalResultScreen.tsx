import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import type { MoodType, SleepType } from '../store/slices/markListSlice';
import { AppHeaderText } from './AppHeaderText';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import { AppEmoji } from './AppEmoji';

type FinalResultScreenProps = {
  moodMark: MoodType;
  sleepMark: SleepType;
  onBack: () => void;
};

export const FinalResultScreen: React.FC<FinalResultScreenProps> = ({
  moodMark,
  sleepMark,
  onBack,
}) => (
  <View style={[styles.finalResultContainer, theme.shadowStyle]}>
    <View>
      <AppHeaderText style={styles.headerFinalResult} variant="bold">
        Thank you for sharing!
      </AppHeaderText>
    </View>
    <View style={styles.finalResult}>
      <View>
        <AppEmoji
          style={styles.finalEmoji}
          description={moodMark}
          size={theme.iconSize.large}
        />
        <AppText style={styles.descriptionText} variant="bold">
          {moodMark}
        </AppText>
      </View>
      <View>
        <AppEmoji
          style={styles.finalEmoji}
          description={sleepMark}
          size={theme.iconSize.large}
        />
        <AppText style={styles.descriptionText} variant="bold">
          {sleepMark}
        </AppText>
      </View>
    </View>
    <Pressable
      style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
      onPress={onBack}
    >
      <AppText style={styles.buttonText} variant="bold">
        BACK
      </AppText>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
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

  descriptionText: {
    color: theme.colorBrown,
    fontSize: 15,
    textAlign: 'center',
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
    color: theme.colorBlack,
    textAlign: 'center',
  },
  finalEmoji: {
    alignSelf: 'center',
    marginHorizontal: 20,
    marginTop: 25,
  },
});
