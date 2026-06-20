import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import type { MoodType, SleepType } from '../store/slices/markListSlice';
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
  <View style={styles.screenContainer}>
    <View style={[styles.resultContainer, theme.shadowStyle]}>
      <View>
        <AppText variant="h1" style={styles.header}>
          Thank you for sharing!
        </AppText>
      </View>
      <View style={styles.resultRow}>
        <View style={styles.emojiContainer}>
          <AppEmoji description={moodMark} size={theme.iconSize.large} />
          <AppText variant="description">{moodMark}</AppText>
        </View>
        <View style={styles.emojiContainer}>
          <AppEmoji description={sleepMark} size={theme.iconSize.large} />
          <AppText variant="description">{sleepMark}</AppText>
        </View>
      </View>
    </View>
    <Pressable
      style={({ pressed }) => [
        styles.button,
        theme.shadowStyle,
        { opacity: pressed ? 0.7 : 1 },
      ]}
      onPress={onBack}
    >
      <AppText variant="button">BACK</AppText>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  resultContainer: {
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.colorWhite,
    borderRadius: 12,
  },
  header: {
    marginBottom: 8,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 64,
  },
  emojiContainer: {
    alignItems: 'center',
    gap: 8,
  },
  button: {
    alignSelf: 'center',
    width: 150,
    marginTop: 16,
    padding: 10,
    borderRadius: 12,
    backgroundColor: theme.colorYellow,
  },
});
