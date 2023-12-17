import React, { memo } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Container, FocusAwareStatusBar, Text } from 'components';
import { useTheme, Button } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useLayout } from 'hooks';

import Dots from './Dots';

import { Images } from 'assets/images';
import { OnboardingSpec } from 'constants/types';
import { IntroStackParamList } from 'navigation/types';

const OnboardingScreen = memo(() => {
  const theme = useTheme();
  const translationX = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  const { t } = useTranslation(['common', 'intro']);
  const { dispatch } = useNavigation();
  const { width, top, bottom } = useLayout();

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  const [index, setIndex] = React.useState<number>(0);
  const [text, setText] = React.useState<string>('');

  const pages: OnboardingSpec[] = [
    {
      image: Images.image1,
      title: t('intro:title_1'),
      description: t('intro:description_1'),
    },
    {
      image: Images.image2,
      title: t('intro:title_2'),
      description: t('intro:description_2'),
    },
    {
      image: Images.image3,
      title: t('intro:title_3'),
      description: t('intro:description_3'),
    },
    {
      image: Images.image4,
      title: t('intro:title_4'),
      description: t('intro:description_4'),
    },
  ];

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ x: width * index });
    if (index === pages.length - 1) {
      setTimeout(() => {
        setText(t('common:get_started').toString());
      }, 100);
    } else {
      setText(t('common:next').toString());
    }
  }, [index, pages]);

  const imageAnim = useAnimatedStyle(() => {
    const transX = interpolate(
      translationX.value,
      [0, width, width * 2],
      [0, -width, -width * 2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: transX }],
    };
  });
  const backAnim = useAnimatedStyle(() => {
    const transX = interpolate(
      translationX.value,
      [0, width, width * 2, width * 3],
      [-width, 0, 0, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: transX }],
    };
  });

  const buttonAnim = useAnimatedStyle(() => {
    const widthButton = interpolate(
      translationX.value,
      [0, width, width * 2, width * 3],
      [100, 100, 100, width - 64],
      Extrapolate.CLAMP
    );

    const right = interpolate(
      translationX.value,
      [0, width, width * 2, width * 2.9, width * 3],
      [0, 0, 0, 0, 32],
      Extrapolate.CLAMP
    );

    const borderTopRightRadius = interpolate(
      translationX.value,
      [0, width, width * 2, width * 2.9, width * 3],
      [0, 0, 0, 0, 24],
      Extrapolate.CLAMP
    );
    const borderBottomRightRadius = interpolate(
      translationX.value,
      [0, width, width * 2, width * 2.9, width * 3],
      [0, 0, 0, 0, 24],
      Extrapolate.CLAMP
    );

    return {
      width: widthButton,
      right,
      borderTopRightRadius,
      borderBottomRightRadius,
    };
  });

  const dotsAnim = useAnimatedStyle(() => {
    const transX = interpolate(
      translationX.value,
      [0, width, width * 2, width * 3],
      [0, 0, 0, -width],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translationX.value,
      [0, width, width * 2, width * 2.1, width * 2.1, width * 2.4, width * 3],
      [1, 1, 1, 0.2, 0.5, 0],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX: transX }],
      opacity,
    };
  });

  const onScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let e = event.nativeEvent.targetContentOffset?.x;
      if (!!e) {
        setIndex(e / width);
      } else {
        setIndex(0);
      }
    },
    [scrollRef]
  );

  const nextScreen = React.useCallback((screenName: keyof IntroStackParamList) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);

  const handleGoNewsletter = React.useCallback(() => {
    nextScreen('Newsletter');
    //AsyncStorage.setItem(EKeyAsyncStorage.intro, '1');
  }, []);

  return (
    <Container useSafeArea={false}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <View style={styles.topView}>
        <Animated.View
          style={[styles.flexDirection, { width: width * pages.length - 1 }, imageAnim]}>
          {pages.map((i, index) => (
            <View key={index}>
              <Image style={{ width: width, height: '100%' }} source={i.image} />
            </View>
          ))}
        </Animated.View>
      </View>
      <View style={styles.bottomView}>
        {pages.map((i, index) => {
          const { title, description } = i;
          const opacityAnim = useAnimatedStyle(() => {
            const opacity = interpolate(
              translationX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [0, 1, 0],
              Extrapolate.CLAMP
            );

            return {
              opacity: opacity,
            };
          });
          return (
            <Animated.View key={index} style={[opacityAnim, { width: width }]}>
              <View style={{ position: 'absolute', top: 48, width: '100%' }}>
                <Text category="h3" marginHorizontal={40} center>
                  {title}
                </Text>
                <Text center marginTop={16} status="description" marginHorizontal={32}>
                  {description}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </View>
      <View style={[StyleSheet.absoluteFill]}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          ref={scrollRef as any}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToInterval={width}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
          onScroll={scrollHandler}
          style={{ width: width }}
          contentContainerStyle={{ width: width * pages.length - 1 }}
          onScrollEndDrag={(event) => onScrollEnd(event)}
        />
        <View style={[styles.top, { top: top + 8 }]}>
          <Image style={styles.logo} source={Images.logo} />
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              backgroundColor: theme['background-basic-color-3'],
              borderRadius: 20,
            }}
            activeOpacity={0.7}
            onPress={handleGoNewsletter}>
            <Text category="b2" status="body">
              {t('common:skip')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottom, { bottom: bottom + 16 }]}>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              },
              dotsAnim,
            ]}>
            <View style={styles.space}>
              <Animated.View style={backAnim}>
                <TouchableOpacity
                  style={styles.backView}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (index === 0) {
                      return;
                    }
                    setIndex(index - 1);
                  }}>
                  <Text status="sub" category="b2">
                    {t('common:back')}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
            <Dots translationX={translationX} data={pages} />
          </Animated.View>
          <Animated.View style={[styles.buttonView, buttonAnim]}>
            <Button
              style={styles.button}
              onPress={() => {
                if (index === pages.length - 1) {
                  handleGoNewsletter();
                }
                setIndex(index + 1);
              }}
              children={text}
            />
          </Animated.View>
        </View>
      </View>
    </Container>
  );
});

export default OnboardingScreen;

const styles = StyleSheet.create({
  flexDirection: {
    flexDirection: 'row',
  },
  logo: {
    width: 48,
    height: 48,
  },
  bottomView: {
    flex: 4,
  },
  topView: {
    overflow: 'hidden',
    flex: 6,
    marginHorizontal: 8,
    marginTop: 8,
    borderRadius: 16,
  },
  top: {
    left: 32,
    right: 32,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonView: {
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    overflow: 'hidden',
    alignSelf: 'flex-end',
  },
  button: {
    width: '100%',
    borderRadius: 0,
  },
  space: {
    width: 100,
  },
  backView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
