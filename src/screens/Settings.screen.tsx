import React from 'react';
import { StyleSheet, View, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useMarkList from '../hooks/useMarkList.ts';
import { theme } from '../constants/theme.ts';
import { AppText } from '../components/AppText.tsx';

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
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.screen}>
      <View style={styles.settingsContainer}>
        <AppText variant="h2" style={styles.header}>
          History settings
        </AppText>
        <View style={theme.shadowStyle}>
          <Pressable
            style={({ pressed }) => [
              styles.settingButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={handleClearHistory}
          >
            <AppText variant="body">Clear history</AppText>
          </Pressable>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        <AppText variant="h2" style={styles.header}>
          DevTools
        </AppText>
        <View style={theme.shadowStyle}>
          <Pressable
            style={({ pressed }) => [
              styles.settingButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={onAddMockData}
          >
            <AppText variant="body">Add mock data</AppText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    gap: theme.spacing.l,
    paddingTop: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    backgroundColor: theme.COLOR_CONFIG_UI.screenBackground,
  },
  settingsContainer: {
    gap: theme.spacing.s,
  },
  header: {
    marginLeft: theme.spacing.m,
  },
  settingButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 56,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: theme.COLOR_CONFIG_UI.cardBackground,
  },
});
