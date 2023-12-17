import React from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, HideWithKeyboard, Text } from 'components';
import { Button, CheckBox, Icon, Input, Layout } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuth, useBoolean, useLayout } from 'hooks';

import { Images } from 'assets/images';
import { EKeyAsyncStorage } from 'constants/types';
import { RootStackParamList } from 'navigation/types';

const Newsletter = React.memo(() => {
  const { dispatch } = useNavigation();
  const { isSignedIn } = useAuth();
  const { height, top, bottom } = useLayout();
  const { t } = useTranslation(['common', 'new_letters']);
  const [checked, { toggle }] = useBoolean(false);

  const IMAGE_HEIGHT = height / 2;
  const scrollY = useSharedValue(0);

  const [text, setText] = React.useState<string>('');

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const imageAnim = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
      [-IMAGE_HEIGHT, 0, 0],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      scrollY.value,
      [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT, IMAGE_HEIGHT + 1],
      [1.5, 1, 1, 1],
      Extrapolate.CLAMP
    );

    return {
      height: IMAGE_HEIGHT,
      transform: [{ translateY }, { scale }],
    };
  });

  const nextScreen = React.useCallback((screenName: keyof RootStackParamList) => {
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

  const handleSignIn = React.useCallback(() => {
    if (isSignedIn) {
      nextScreen('Drawer');
    } else {
      nextScreen('Auth');
    }
    AsyncStorage.setItem(EKeyAsyncStorage.intro, '1');
  }, [isSignedIn]);

  return (
    <Container useSafeArea={false}>
      <Image style={[styles.logo, { top: top + 8 }]} source={Images.logo} />
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: bottom + 52 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}>
          <Animated.View style={imageAnim}>
            <Image style={styles.image} source={Images.image5} resizeMode="cover" />
          </Animated.View>
          <Text marginTop={24} category="h4" status="content" center>
            {t('new_letters:news_letter')}
          </Text>
          <Text marginTop={16} category="b1" status="body" center marginHorizontal={32}>
            {t('new_letters:sign_up_now')}
          </Text>
          <Input
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder={t('common:email_or_phone_number').toString()}
            accessoryLeft={(props) => <Icon pack="assets" name="user" {...props} />}
          />
          <CheckBox style={styles.checkbox} checked={checked} onChange={toggle}>
            {t('new_letters:receive_email_communications').toString()}
          </CheckBox>
          <Button style={styles.button} children="Subscribe" onPress={handleSignIn} />
        </KeyboardAvoidingView>
      </Animated.ScrollView>
      <HideWithKeyboard>
        <Layout style={[styles.viewBottom, { paddingBottom: bottom + 16 }]}>
          <Text category="b3" status="body" center>
            {t('new_letters:welcome_to_dakota')}
            <Text status="basic" category="b5">
              {t('new_letters:let_go_shopping')}
            </Text>
          </Text>
        </Layout>
      </HideWithKeyboard>
    </Container>
  );
});

export default Newsletter;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  logo: {
    width: 48,
    height: 48,
    left: 32,
    position: 'absolute',
    zIndex: 1,
  },
  input: {
    marginTop: 32,
    marginHorizontal: 32,
  },
  checkbox: {
    marginHorizontal: 32,
    marginTop: 24,
  },
  button: {
    marginTop: 24,
    marginHorizontal: 32,
  },
  viewBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 8,
    position: 'absolute',
  },
});
