import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useTheme, Icon, Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import Text from './Text';

import { AddressFragment } from 'constants/types';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

interface ProjectItemProps {
  style?: ViewStyle;
  enabled?: boolean;
  item: AddressFragment;
  onPress?(): void;
  onDelete?(): void;
}

const ProjectItem: React.FC<ProjectItemProps> = React.memo(
  ({ style, item, onPress, onDelete, enabled = false }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    const refSwipeable = React.useRef<Swipeable>(null);
    const { name_address, address, phone_number, is_default } = item;

    const borderColor =
      enabled && is_default ? theme['background-basic-color-6'] : theme['background-basic-color-3'];

    const renderRightActions = React.useCallback(() => {
      return (
        <View>
          <RectButton
            style={styles.button}
            onPress={() => {
              refSwipeable.current?.close();
              onDelete && onDelete();
            }}>
            <Icon pack="assets" name="trash" style={styles.icon} />
          </RectButton>
        </View>
      );
    }, []);

    return (
      <Swipeable
        ref={refSwipeable}
        renderRightActions={renderRightActions}
        containerStyle={styles.container}
        overshootRight={false}
        enabled={enabled}>
        <TouchableOpacity
          activeOpacity={1}
          style={[
            styles.item,
            {
              backgroundColor: theme['background-basic-color-1'],
              borderColor,
            },
            style,
          ]}
          onPress={onPress}>
          <View style={styles.box2}>
            <View style={styles.row}>
              <Text category="t1">{name_address}</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Icon
                  pack="assets"
                  name="option"
                  style={{ tintColor: theme['background-basic-color-5'] }}
                />
              </TouchableOpacity>
            </View>
            <Text category="b3" status="body" marginVertical={12}>
              {address}
            </Text>
            <Text category="b3" status="body">
              {phone_number}
            </Text>
            {enabled && is_default && (
              <Layout level="6" style={styles.default}>
                <Text category="c1" status="white">
                  {t('default')}
                </Text>
              </Layout>
            )}
          </View>
          <Layout style={[styles.box, { borderColor }]}>
            <Icon
              pack="assets"
              name="address"
              style={{ tintColor: theme['background-basic-color-7'] }}
            />
          </Layout>
        </TouchableOpacity>
      </Swipeable>
    );
  }
);

export default ProjectItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderRadius: 8,
    borderWidth: 2,
    marginLeft: 40,
  },
  box2: {
    paddingRight: 20,
    paddingLeft: 36,
    paddingVertical: 24,
    overflow: 'hidden',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  button: {
    flex: 1,
    paddingHorizontal: 24,
    marginLeft: -12,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  box: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    position: 'absolute',
    top: 22,
    left: -24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  default: {
    height: 80,
    width: 160,
    position: 'absolute',
    alignItems: 'center',
    transform: [{ rotate: '315.51deg' }],
    right: -70,
    bottom: -30,
    paddingTop: 8,
  },
});
