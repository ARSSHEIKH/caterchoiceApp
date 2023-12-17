import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image, StyleSheet, FlatList, View } from 'react-native';
import { Container, NavigationAction, Text } from 'components';
import { TopNavigation, Button } from '@ui-kitten/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';
import FastImage from 'react-native-fast-image';
import keyExtractor from 'utils/keyExtractor';
import { ImageFragment } from 'constants/types';
import { ImageDetailsNavigationProps } from 'navigation/types';

const ImageDetail = React.memo(() => {
  const { goBack } = useNavigation();
  const { t } = useTranslation('common');
  const { height, width, top, bottom } = useLayout();

  const {
    params: { images },
  } = useRoute<ImageDetailsNavigationProps>();

  const renderItem = React.useCallback(({ item }: { item: ImageFragment }) => {
    return (
      <View style={{ width, height }}>
        <FastImage source={{ uri: item.image_url }} resizeMode="contain" style={styles.image} />
        <LinearGradient
          colors={['#00000070', 'rgba(0, 0, 0, 0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          style={styles.linear}
        />
      </View>
    );
  }, []);

  return (
    <Container useSafeArea={false}>
      <TopNavigation
        style={[styles.header, { marginTop: top }]}
        title={() => (
          <Text category="t1" status="white">
            {t('image_detail')}
          </Text>
        )}
        appearance="control"
        accessoryLeft={<NavigationAction status="white" />}
        accessoryRight={<NavigationAction icon="heart" status="white" onPress={() => {}} />}
      />
      <FlatList
        data={images || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        bounces={false}
        pagingEnabled={false}
        decelerationRate="fast"
      />
      <Button
        children={t('go_shopping').toString()}
        style={[styles.button, { bottom: bottom + 16 }]}
        onPress={goBack}
      />
    </Container>
  );
});

export default ImageDetail;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    zIndex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  linear: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  button: {
    position: 'absolute',
    left: 32,
    right: 32,
  },
});
