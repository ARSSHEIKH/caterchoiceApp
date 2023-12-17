import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ViewProps,
  KeyboardAvoidingView,
  Platform,
  ImageRequireSource,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Container, HideWithKeyboard, Text } from 'components';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme, Button, Layout } from '@ui-kitten/components';
import { useAnimationState, MotiView } from 'moti';
import { useLayout } from 'hooks';
import { useTranslation } from 'react-i18next';

import { Images } from 'assets/images';

interface AuthLayoutProps extends ViewProps {
  title: string;
  show_logo?: boolean;
  bottom_content?: {
    title: string[];
    onPress?(): void;
  };
  is_success?: boolean;
  modal_content?: {
    title: string;
    description: string;
    image?: ImageRequireSource;
    title_button: string;
    onPress?(): void;
  };
}

const AuthLayout = React.memo<AuthLayoutProps>(
  ({ title, show_logo, bottom_content, is_success, modal_content, ...rest }) => {
    const theme = useTheme();
    const scrollY = useSharedValue(0);
    const { height, width, bottom } = useLayout();
    const { t } = useTranslation('common');
    const CONTENT_HEIGHT = height * 0.7 + bottom + 52;
    const MODAL_HEIGHT = height * 0.7;

    const scrollHandler = useAnimatedScrollHandler((event) => {
      scrollY.value = event.contentOffset.y;
    });

    const contentAnim = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollY.value,
        [CONTENT_HEIGHT, 0, -CONTENT_HEIGHT - bottom - 52],
        [0, 0, -CONTENT_HEIGHT + CONTENT_HEIGHT / 6]
      );

      return {
        backgroundColor: theme['background-basic-color-1'],
        height: CONTENT_HEIGHT,
        transform: [{ translateY }],
        paddingHorizontal: 32,
      };
    });

    const imageAnim = useAnimatedStyle(() => {
      const translateY = interpolate(scrollY.value, [-height, 0, height], [-height, 0, height]);

      return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        zIndex: 11,
        transform: [{ translateY }],
      };
    });

    const useTranslate1 = () => {
      return useAnimationState({
        from: {
          opacity: 0,
          translateY: CONTENT_HEIGHT,
        },
        to: {
          opacity: 1,
          translateY: 0,
        },
      });
    };

    const useTranslate2 = () => {
      return useAnimationState({
        from: {
          opacity: 0,
          translateY: bottom + 52,
        },
        to: {
          opacity: 1,
          translateY: 0,
        },
      });
    };

    const translate1 = useTranslate1();
    const translate2 = useTranslate2();
    const translate3 = useTranslate1();

    React.useEffect(() => {
      if (translate1.current === 'to' && is_success) {
        translate1.transitionTo('from');
        translate2.transitionTo('from');
        translate3.transitionTo('to');
      }
    }, [is_success]);

    React.useEffect(() => {
      translate1.transitionTo('to');
      translate2.transitionTo('to');
      translate3.transitionTo('from');
    }, []);

    return (
      <>
       <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="never"
      keyboardOpeningTime={0}
      enableResetScrollToCoords={false}
    >
        <View {...rest} />
        </KeyboardAwareScrollView>
        
        {!!modal_content && is_success && (
          <MotiView
            transition={{
              type: 'timing',
              duration: 1000,
            }}
            state={translate3}
            delay={700}>
            <Animated.View
              style={[
                styles.modal,
                {
                  backgroundColor: theme['background-basic-color-1'],
                  height: height,
                  paddingBottom: bottom + 16,
                },
              ]}>
              <Text category="h4" status="description" center marginTop={32}>
                {modal_content.title ? modal_content.title : t('success')}!
              </Text>
              <Text center category="b1" status="description" marginTop={8}>
                {modal_content.description}
              </Text>
              <View style={styles.imageView}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={modal_content.image ? modal_content.image : Images.image_success}
                />
              </View>
              <Button
                style={styles.button}
                children={modal_content.title_button}
                onPress={modal_content.onPress}
              />
            </Animated.View>
          </MotiView>
        )}
        
      </>
    );
  }
);

export default AuthLayout;

const styles = StyleSheet.create({
  background: {
    opacity: 0.7,
    flex: 1,
  },
  content: {
    flex: 7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    flex:1
  },
  logoView: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    marginTop: -70 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logoContent: {
    width: 90,
    height: 90,
    borderRadius: 56 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
  },
  viewBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 8,
    position: 'absolute',
    zIndex: 10,
  },
  button: {
    marginTop: 16,
  },
  imageView: {
    flex: 1,
    marginTop: 40,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
