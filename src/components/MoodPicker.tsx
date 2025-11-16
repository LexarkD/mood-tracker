import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';
//я бы хотел использовать ... <Text key={_.uniqueId("emoji_")} style={styles.moodText}> ...

const moodOptions = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

export const MoodPicker: React.FC = () => {
  return (
    <View style={styles.moodList}>
      {moodOptions.map(option => (
        <Text key={option.emoji} style={styles.moodText}>
          {option.emoji}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  moodText: {
    fontSize: 24,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});
