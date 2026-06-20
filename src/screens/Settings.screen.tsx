import React from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMarkList from '../hooks/useMarkList.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from '../components/AppText.tsx';
import { AppHeaderText } from '../components/AppHeaderText.tsx';

export const Settings: React.FC = () => {
  const { onAddMockData, onClearMarkList } = useMarkList();

  // NOTE: модальное окно с предупреждением и подтверждением при удалении.
  const handleClearHistory = () => {
    Alert.alert(
      'Clear history',
      'Are you sure you want to delete all saved data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: onClearMarkList,
        },
      ],
    );
  };

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.container}>
      <View style={styles.settingsContainer}>
        <AppHeaderText style={styles.settingHeader}>
          History settings
        </AppHeaderText>
        <View style={[styles.settingBlock, theme.shadowStyle]}>
          <Pressable
            style={({ pressed }) => [
              styles.settingRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleClearHistory}
          >
            <AppText style={styles.settingText}>Clear history</AppText>
          </Pressable>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <AppHeaderText style={styles.settingHeader}>DevTools</AppHeaderText>
        <View style={[styles.settingBlock, theme.shadowStyle]}>
          <Pressable
            style={({ pressed }) => [
              styles.settingRow,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={onAddMockData}
          >
            <AppText style={styles.settingText}>Add mock data</AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorGreen,
  },
  settingsContainer: {
    marginHorizontal: 10,
  },
  settingHeader: {
    color: theme.colorBrown,
    fontSize: 15,
    marginLeft: 16,
    marginBottom: 8,
  },
  settingBlock: {
    backgroundColor: theme.colorWhite,
    borderRadius: 12,
    marginBottom: 24,
  },
  settingRow: {
    minHeight: 56,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  settingText: {
    color: theme.colorBrown,
    fontSize: 16,
  },
});
