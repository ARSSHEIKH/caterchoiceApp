import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Container, NavigationAction, TabItem } from 'components';
import { TopNavigation, ViewPager } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import AllOrder from './components/AllOrder';
import Shipped from './components/Shipped';
import Processing from './components/Processing';
import Unpaid from './components/Unpaid';
import Return from './components/Return';

import keyExtractor from 'utils/keyExtractor';

const MyOrder = React.memo(() => {
  const refScroll = React.useRef<FlatList>(null);
  const { t } = useTranslation(['common', 'order']);

  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  React.useEffect(() => {
    refScroll.current?.scrollToIndex({
      index: activeIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [activeIndex]);

  const header_tabs = [
    t('order:all_order'),
    // t('common:shipped'),
    // t('common:processing'),
    // t('common:unpaid'),
    // t('common:return'),
  ];

  const renderTabs = React.useCallback(
    ({ item, index }: { item: string; index: number }) => {
      return (
        <TabItem
          title={item}
          isSelected={activeIndex === index}
          onPress={() => setActiveIndex(index)}
          style={styles.tab}
        />
      );
    },
    [activeIndex]
  );

  return (
    <Container>
      <TopNavigation
        title={t('common:my_order')}
        accessoryLeft={<NavigationAction />}
        // accessoryRight={<NavigationAction icon="order" />}
      />
      <View>
        <FlatList
          ref={refScroll}
          style={{ flexGrow: 0 }}
          data={header_tabs}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={renderTabs}
          contentContainerStyle={styles.contentTab}
        />
      </View>
      <ViewPager
        selectedIndex={activeIndex}
        onSelect={setActiveIndex}
        shouldLoadComponent={(index) => index === activeIndex}
        style={styles.viewPager}>
        <AllOrder />
        {/* <Shipped />
        <Processing />
        <Unpaid />
        <Return /> */}
      </ViewPager>
    </Container>
  );
});

export default MyOrder;

const styles = StyleSheet.create({
  contentTab: {
    paddingLeft: 16,
  },
  tab: {
    marginRight: 16,
  },
  viewPager: {
    flex: 1,
  },
});
