import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, NavigationAction, SelectItem, Text } from 'components';
import { useTheme, TopNavigation, Input, Layout, Icon, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useImagePicker, useLayout } from 'hooks';

import SvgStarRate from 'assets/svgs/SvgStarRate';

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { Images } from 'assets/images';
import { ETypePhoto, IChoosePhoto } from 'constants/types';

const ProductReviewNew = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { t } = useTranslation(['common', 'review']);
  const { bottom, bottomButton } = useLayout();
  const { takePhoto, choosePhoto } = useImagePicker();

  const [rate, setRate] = React.useState<number>(4);
  const [review, setReview] = React.useState<string>('');
  const [image, setImage] = React.useState<string | undefined>();

  const bottomSheetPhotoRef = React.useRef<BottomSheet>(null);
  const initialSnapPoints = React.useMemo(() => ['1%', 'CONTENT_HEIGHT'], []);
  const { animatedHandleHeight, animatedSnapPoints, animatedContentHeight, handleContentLayout } =
    useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const data_photo: IChoosePhoto[] = [
    {
      title: t('common:take_photo'),
      type: ETypePhoto.TAKE_PHOTO,
    },
    {
      title: t('common:choose_from_library'),
      type: ETypePhoto.LIBRARY,
    },
  ];

  return (
    <Container>
      <TopNavigation
        title={t('review:add_a_review').toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Content isPadding contentContainerStyle={{ paddingBottom: bottomButton }}>
        <View style={[styles.item, { borderColor: theme['background-basic-color-10'] }]}>
          <View style={[styles.imageView, { height: 100 }]}>
            <Image resizeMode="cover" style={styles.image} source={{ uri: Images.image11 }} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.tagView}>
              {['#TOP', '#JACKET'].map((i, idx) => {
                return (
                  <Text category="c3" status="body" key={idx}>
                    {i}
                  </Text>
                );
              })}
            </View>
            <Text category="b3" marginTop={4} numberOfLines={2}>
              Big Logo Jacket With Sweet Long Sheet
            </Text>
            <View style={styles.priceView}>
              <Text category="b2">$233</Text>
              <Text category="c3" status="placeholder" marginLeft={4} marginTop={3} line_through>
                $300
              </Text>
            </View>
          </View>
        </View>
        <Text category="h6" marginTop={24}>
          {t('review:rating_product')}
        </Text>
        <View style={styles.starView}>
          {Array(5)
            .fill(5)
            .map((i, idx) => {
              return (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setRate(idx + 1)}>
                  <SvgStarRate
                    key={idx}
                    fill={idx < rate ? theme['color-yellow-500'] : theme['text-sub-color']}
                    style={{ marginRight: 4 }}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
        <Text category="h6" marginTop={24}>
          {t('review:write_your_review')}
        </Text>
        <Layout level="2" style={styles.box}>
          <Input
            value={review}
            onChangeText={setReview}
            multiline
            placeholder={t('review:placeholder_review').toString()}
            style={styles.input}
          />
        </Layout>
        {image ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => bottomSheetPhotoRef.current?.expand()}
            style={styles.viewImageReview}>
            <Image
              resizeMode="cover"
              style={styles.imageReview}
              source={{ uri: 'data:image/jpeg;base64,' + image }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => bottomSheetPhotoRef.current?.expand()}
            style={[styles.addImage, { borderColor: theme['background-basic-color-5'] }]}>
            <Icon pack="assets" name="photo" />
            <Text marginLeft={8} status="placeholder">
              {t('review:add_image_here')}
            </Text>
          </TouchableOpacity>
        )}
      </Content>
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <Button children={t('common:submit').toString()} onPress={goBack} />
      </Layout>
      <BottomSheet
        ref={bottomSheetPhotoRef}
        snapPoints={animatedSnapPoints}
        index={-1}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        backdropComponent={BottomSheetBackdrop}>
        <BottomSheetView onLayout={handleContentLayout}>
          <View style={{ paddingBottom: bottom + 16, paddingHorizontal: 16 }}>
            {data_photo.map((item, index) => {
              return (
                <SelectItem
                  key={index}
                  title={item.title}
                  is_last={index === data_photo.length - 1}
                  onPress={() => {
                    if (item.type === ETypePhoto.TAKE_PHOTO) {
                      takePhoto((i) => setImage(i?.base64));
                    } else {
                      choosePhoto((i) => setImage(i?.base64));
                    }
                    bottomSheetPhotoRef.current?.close();
                  }}
                />
              );
            }, [])}
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Container>
  );
});

export default ProductReviewNew;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 16,
    borderWidth: 1,
  },
  imageView: {
    borderRadius: 8,
    overflow: 'hidden',
    aspectRatio: 1 / 1,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  flex: {
    flex: 1,
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  starView: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
  },
  box: {
    marginTop: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  addImage: {
    borderWidth: 1,
    borderStyle: 'dashed',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 6,
  },
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 0,
    minHeight: 153,
  },
  viewImageReview: {
    height: 200,
    borderRadius: 6,
    overflow: 'hidden',
  },
  imageReview: {
    width: '100%',
    height: '100%',
  },
});
