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
    <View style={styles.contentContainer}>
      <View style={[styles.resultContainer, theme.shadowStyle]}>
        <AppText variant="h1" style={styles.header}>
          Thank you for sharing!
        </AppText>
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
    </View>
    <View style={styles.footerContainer}>
      <Pressable
        style={({ pressed }) => [
          // styles.button,
          theme.appButton,
          theme.shadowStyle,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onBack}
      >
        <AppText variant="button">BACK</AppText>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultContainer: {
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    backgroundColor: theme.COLOR_CONFIG_UI.cardBackground,
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
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 32,
  },
});
