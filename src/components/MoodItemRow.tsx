import React, { useContext } from 'react';
import { View, Pressable, StyleSheet, LayoutAnimation } from 'react-native';
import { format } from 'date-fns/format';
import { AppContext } from '../App.provider.tsx';
import { MoodOptionWithTimestamp } from '../types.ts';
import { theme } from '../theme.ts';
import { AppText } from './AppText.tsx';

type MoodItemRowProps = {
  item: MoodOptionWithTimestamp;
};

export const MoodItemRow: React.FC<MoodItemRowProps> = ({ item }) => {
  const { handleDeleteMood } = useContext(AppContext);

  const handleDeletedRow = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handleDeleteMood(item);
  };

  return (
    <View style={styles.moodItem}>
      <View style={styles.iconAndDescription}>
        <AppText style={styles.moodValue}>{item.mood.emoji}</AppText>
        <AppText style={styles.moodDescription} variant="bold">
          {item.mood.description}
        </AppText>
      </View>
      <AppText style={styles.moodDate}>
        {format(new Date(item.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
      </AppText>
      <Pressable hitSlop={16} onPress={() => handleDeletedRow()}>
        <AppText style={styles.deleteText} variant="light">
          Delete
        </AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodValue: {
    textAlign: 'center',
    fontSize: 40,
    marginRight: 10,
  },
  moodDate: {
    textAlign: 'center',
    color: theme.colorLavender,
  },
  moodItem: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodDescription: {
    fontSize: 18,
    color: theme.colorPurple,
  },
  iconAndDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteText: {
    color: theme.colorBlue,
  },
});
