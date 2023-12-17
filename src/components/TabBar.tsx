import React from 'react';
import { MotiView } from 'moti';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme } from '@ui-kitten/components';
import { useLayout } from 'hooks';

import Text from './Text';

import _ from 'lodash';

interface TabBarProps {
  style?: ViewStyle;
  data: string[];
  selectedTab: number;
  onPress?(index: number): void;
}

const TabBar: React.FC<TabBarProps> = ({ style, selectedTab, data, onPress }) => {
  const theme = useTheme();
  const { width } = useLayout();

  const TAB_WIDTH = (width - 2 * 24) / data.length;

  return (
    <View style={[styles.tabView, { borderColor: theme['background-basic-color-10'] }, style]}>
      {data.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPress && onPress(index)}
          key={index}
          style={styles.tab}>
          <Text status="placeholder" category="t1">
            {item}
          </Text>
        </TouchableOpacity>
      ))}
      <MotiView
        animate={{
          backgroundColor: theme['color-primary-500'],
          transform: [{ translateX: TAB_WIDTH * selectedTab }],
          width: TAB_WIDTH,
          opacity: 1,
        }}
        transition={{
          duration: 0,
          transform: {
            type: 'timing',
            duration: 200,
          },
          type: 'timing',
        }}
        style={styles.activeTab}>
        <Text status="white" category="t1">
          {data[selectedTab]}
        </Text>
      </MotiView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabView: {
    flexDirection: 'row',
    overflow: 'hidden',
    padding: 8,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: '#F6F6F6',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    position: 'absolute',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 8,
  },
});
