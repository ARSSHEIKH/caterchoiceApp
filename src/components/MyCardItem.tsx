import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { useTheme, Icon, Input, Layout, Toggle } from '@ui-kitten/components';
import { useAnimationState, MotiView } from 'moti';
import { useTranslation } from 'react-i18next';
import { useBoolean, useLayout } from 'hooks';
import FastImage from 'react-native-fast-image';

import Text from './Text';

import { Images } from 'assets/images';
import { CardFragment } from 'constants/types';

interface MyCardItemProps {
  onPress?(): void;
  style?: ViewStyle;
  item: CardFragment;
}

const MyCardItem: React.FC<MyCardItemProps> = ({ style, item, onPress }) => {
  const theme = useTheme();
  const { t } = useTranslation('card');
  const { width } = useLayout();
  const { name, image } = item;

  const [expand, { toggle }] = useBoolean(false);
  const [checked, { toggle: toggleStatus }] = useBoolean(false);

  const animationState = useAnimationState({
    from: {
      height: 0,
      opacity: 0,
    },
    to: {
      height: 148,
      opacity: 1,
    },
  });

  const animationArrowState = useAnimationState({
    from: {
      transform: [{ rotate: '90deg' }],
    },
    to: {
      transform: [{ rotate: '270deg' }],
    },
  });

  React.useEffect(() => {
    if (!expand) {
      animationState.transitionTo('from');
      animationArrowState.transitionTo('from');
    } else {
      animationState.transitionTo('to');
      animationArrowState.transitionTo('to');
    }
  }, [expand]);

  return (
    <Layout style={[styles.box, style]}>
      <View style={styles.content}>
        <ImageBackground style={[styles.container, { width: width - 36 * 2 }]} source={image}>
          <TouchableOpacity activeOpacity={0.7} style={styles.flexOne} onPress={onPress}>
            <Text category="b2" status="white" right>
              Debit
            </Text>
            <View style={styles.flexOne} />
            <Text category="h6" status="white">
              **** **** **** 0329
            </Text>
            <Text category="b2" status="white">
              {name}
            </Text>
            <View style={styles.row}>
              <View style={styles.row1}>
                <Text category="c3" status="white" marginRight={6}>
                  {`VALID\nTHRU`}
                </Text>
                <Text category="c3" status="white">
                  03/24
                </Text>
              </View>
              <Image source={Images.master} style={styles.master} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <MotiView state={animationState} transition={{ type: 'timing' }}>
          <Input
            style={styles.input}
            label={t('card_number').toString()}
            disabled
            status="card"
            value="**** **** **** 0329"
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 24,
            }}>
            <Text category="b2" status="placeholder">
              {t('status_card')}
            </Text>
            <View>
              <Toggle checked={checked} onChange={toggleStatus} />
            </View>
          </View>
        </MotiView>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggle}
        style={[
          styles.arrow,
          {
            borderColor: theme['background-basic-color-10'],
            backgroundColor: theme['background-basic-color-1'],
          },
        ]}>
        <MotiView state={animationArrowState} transition={{ type: 'timing' }}>
          <Icon pack="assets" name="back" />
        </MotiView>
      </TouchableOpacity>
    </Layout>
  );
};

export default MyCardItem;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 34,
    borderRadius: 16,
    overflow: 'hidden',
    height: 192,
  },
  master: {
    width: 42,
    height: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  flexOne: {
    flex: 1,
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    paddingVertical: 20,
    paddingBottom: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  input: {
    marginTop: 24,
  },
  content: {
    paddingHorizontal: 20,
    width: '100%',
  },
  arrow: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    position: 'absolute',
    bottom: -16,
  },
});
