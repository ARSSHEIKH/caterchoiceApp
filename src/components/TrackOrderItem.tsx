import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useTheme, Icon, Layout } from '@ui-kitten/components';

import Text from './Text';
import SvgLine from 'assets/svgs/SvgLine';

import { ITrackOrder } from 'constants/types';

interface TrackOrderItemProps {
  item: ITrackOrder;
  is_first?: boolean;
  style?: ViewStyle;
}

const TrackOrderItem: React.FC<TrackOrderItemProps> = ({ style, item, is_first }) => {
  const theme = useTheme();
  const { icon, title, description, time, is_complete } = item;

  return (
    <View style={[styles.container, style]}>
      {!is_first && <SvgLine is_complete={is_complete} style={styles.line} />}
      <View style={styles.content}>
        <Layout level="6" style={styles.box}>
          <Layout level={is_complete ? '6' : '1'} style={styles.box1}>
            <Icon
              pack="assets"
              name={icon}
              style={{
                width: 16,
                height: 16,
                tintColor: is_complete ? theme['color-basic-100'] : theme['text-sub-color'],
              }}
            />
          </Layout>
        </Layout>
        <View style={styles.box2}>
          <Text category="b2">{title}</Text>
          <Text category="c2" marginTop={4}>
            {description}
          </Text>
        </View>
        <View style={styles.box3}>
          {time && (
            <Text right category="c3">
              {time}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default TrackOrderItem;

const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: 'row',
  },
  box: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#12131405',
  },
  box1: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 1,
    marginRight: 8,
  },
  box3: {
    flex: 1,
  },
  line: {
    marginLeft: 21,
    marginBottom: -5,
  },
});
