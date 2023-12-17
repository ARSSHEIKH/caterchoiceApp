import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLayout } from 'hooks';
import { useTheme } from '@ui-kitten/components';

import BannerItem from './BannerItem';
import Carousel from 'react-native-reanimated-carousel';

import { BannerSpec } from 'constants/types';

interface BannerProps {
  banners: BannerSpec[];
}

const Banner = ({ banners }: BannerProps) => {
  const theme = useTheme();
  const { width } = useLayout();

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const renderBannerItem = React.useCallback(({ item }) => {
    return <BannerItem item={item} />;
  }, []);

  return (
    <View style={[styles.container, { width: width - 68 }]}>
      <Carousel
        data={banners || []}
        renderItem={renderBannerItem}
        onSnapToItem={setActiveIndex}
        width={width - 68}
        snapEnabled
        loop={false}
        enabled={false}
      />
      {/* <View style={styles.dotView}>
        {banners.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeIndex ? theme['color-primary-500'] : theme['color-basic-1300'],
                  width: index === activeIndex ? 16 : 8,
                  marginRight: index < banners.length - 1 ? 4 : 0,
                },
              ]}
            />
          );
        })}
      </View> */}
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    height: 186,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  dotView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    paddingLeft: 16,
  },
  dot: {
    height: 3,
    width: 8,
    borderRadius: 4,
  },
});
