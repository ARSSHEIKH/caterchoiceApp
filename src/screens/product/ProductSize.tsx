import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, NavigationAction, TabBar, Text } from 'components';
import { useTheme, TopNavigation, Layout, Input } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import { Size_Types_Enum } from 'constants/types';

const ProductSize = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation('product_size');

  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const data = [t('size'), t('length'), t('shoulder'), t('chest')];

  const data_size = [
    { size: 's', length: '18', shoulder: '38', chest: '27' },
    { size: 'm', length: '19', shoulder: '39', chest: '28' },
    { size: 'l', length: '20', shoulder: '40', chest: '29' },
  ];

  return (
    <Container>
      <TopNavigation title={t('size_guide')} accessoryLeft={<NavigationAction />} />
      <Content isPadding>
        <TabBar
          data={[Size_Types_Enum.Inch, Size_Types_Enum.Cm]}
          selectedTab={selectedTab}
          onPress={setSelectedTab}
          style={styles.tab}
        />
        <View style={styles.box}>
          <View style={[styles.top, { borderBottomColor: theme['background-basic-color-4'] }]}>
            {data.map((i, idx) => {
              return (
                <Layout
                  level="3"
                  style={[
                    styles.box1,
                    {
                      borderRightColor:
                        idx < data.length - 1 ? theme['background-basic-color-4'] : 'transparent',
                    },
                  ]}
                  key={idx}>
                  <Text category="b2">{i}</Text>
                </Layout>
              );
            })}
          </View>
          <View>
            {data_size.map((i, idx) => {
              const borderRightColor = theme['background-basic-color-4'];
              const borderBottomColor =
                idx < data_size.length - 1 ? theme['background-basic-color-4'] : 'transparent';

              return (
                <View key={idx} style={[styles.bottom, { borderBottomColor }]}>
                  <View style={[styles.box2, { borderRightColor }]}>
                    <Text category="b1" status="body" uppercase>
                      {i.size}
                    </Text>
                  </View>
                  <View style={[styles.box2, { borderRightColor }]}>
                    <Text category="b1" status="body" uppercase>
                      {i.length}”
                    </Text>
                  </View>
                  <View style={[styles.box2, { borderRightColor }]}>
                    <Text category="b1" status="body" uppercase>
                      {i.shoulder}”
                    </Text>
                  </View>
                  <View style={styles.box3}>
                    <Text category="b1" status="body" uppercase>
                      {i.chest}”
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <Text category="t1" marginTop={24}>
          {t('result_for_your_size')}
        </Text>
        <View style={styles.row}>
          <Input placeholder={t('weight')} style={styles.input} />
          <Input placeholder={t('height')} style={styles.input1} />
        </View>
        <View
          style={[
            styles.size,
            {
              backgroundColor: theme['color-brown-500'],
            },
          ]}>
          <Text category="h6" status="white">
            XL
          </Text>
        </View>
      </Content>
    </Container>
  );
});

export default ProductSize;

const styles = StyleSheet.create({
  tab: {
    marginTop: 24,
  },
  box: {
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#E2E2E2',
    overflow: 'hidden',
    marginTop: 24,
  },
  box1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRightWidth: 1,
  },
  box2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRightWidth: 1,
  },
  box3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  top: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  bottom: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },
  input: {
    flex: 1,
  },
  input1: {
    flex: 1,
    marginLeft: 48,
  },
  size: {
    width: 65,
    aspectRatio: 1 / 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 12,
  },
});
