import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import type { MoodType, SleepType } from '../store/slices/markListSlice';
import { AppText } from './AppText';
import { theme } from '../constants/theme';
import { AppEmoji } from './AppEmoji';

//TODO: Исправлена семантика(название)компонента на FinalResultMark.
// Исправить семантески другие сущности.
type FinalResultScreenProps = {
  moodMark: MoodType;
  sleepMark: SleepType;
  onBack: () => void;
};

export const FinalResultMark: React.FC<FinalResultScreenProps> = ({
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
    gap: theme.spacing.s,
    minHeight: 160,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.COLOR_CONFIG_UI.cardBackground,
    borderRadius: 12,
  },
  header: {
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 56,
  },
  emojiContainer: {
    alignItems: 'center',
    gap: theme.spacing.s,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: theme.spacing.xl,
  },
});
