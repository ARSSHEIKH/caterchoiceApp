import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Icon } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useAppBottomSheet, useLayout } from 'hooks';

import Text from './Text';

import { IconName } from 'assets/icons';
import { reset } from 'navigation/RootNavigation';

type SettingType = {
  title: string;
  icon: keyof IconName;
  onPress?(): void;
};

const ProfileMore: React.FC = () => {
  const theme = useTheme();
  const { bottom } = useLayout();
  const { close } = useAppBottomSheet();

  const { t } = useTranslation('common');

  const data: SettingType[] = [
    {
      title: t('settings'),
      icon: 'settings',
      onPress: () => {},
    },
    {
      title: t('your_activity'),
      icon: 'activity',
      onPress: () => {},
    },
    {
      title: t('archive'),
      icon: 'archive',
      onPress: () => {},
    },
    {
      title: t('card'),
      icon: 'card',
      onPress: () => {},
    },
    {
      title: t('qr_code'),
      icon: 'qr-code',
      onPress: () => {},
    },
    {
      title: t('save'),
      icon: 'save',
      onPress: () => {},
    },
    {
      title: t('log_out'),
      icon: 'log-out',
      onPress: () => reset('Auth'),
    },
  ];

  return (
    <View style={[styles.container, { paddingBottom: bottom + 40 }]}>
      {data.map((item, index) => {
        const { title, icon, onPress } = item;
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => {
              close();
              setTimeout(() => {
                onPress && onPress();
              }, 1000);
            }}
            style={[styles.item, { borderBottomColor: theme['background-basic-color-3'] }]}>
            <Icon
              pack="assets"
              name={icon}
              style={{ tintColor: theme['text-description-color'] }}
            />
            <Text category="t1" marginLeft={12} status="description">
              {title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ProfileMore;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  item: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginTop: 12,
  },
});
