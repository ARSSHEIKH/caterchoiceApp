import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Text } from 'components';
import { useTheme, Button, Icon, Input } from '@ui-kitten/components';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import AuthLayout from 'components/AuthLayout';
import { rulePassword } from 'utils/rules';
import { RootStackParamList } from 'navigation/types';
import {login, userSelector, setLoader} from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from 'store/store';
import Api from "services/api";

interface FormValues {
  email?: string;
  password?: string;
}

interface SocialMedia {
  icon: string;
  onPress?(): void;
}

const SignIn = React.memo(() => {

  const dispatch = useAppDispatch();
  const {error, loader}:any = useAppSelector(userSelector);

  const theme = useTheme();
  const { t } = useTranslation(['common', 'sign_in']);
  const { navigate, dispatch:ndispatch } = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  React.useEffect(() => {
    dispatch(setLoader(false));
  }, []);

  const social_media: SocialMedia[] = [
    {
      icon: 'facebook',
      onPress: () => { },
    },
    {
      icon: 'apple',
      onPress: () => { },
    },
    {
      icon: 'google',
      onPress: () => { },
    },
  ];

  const nextScreen = React.useCallback((screenName: keyof RootStackParamList) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    ndispatch(resetAction);
  }, []);


  const handleSignIn =  React.useCallback(async(data:any) => {
    const json = await dispatch(login(data));
    if(json?.status==200){
      Api.setClientToken(json?.data?.access_token);
      nextScreen('Drawer');
    }
  
  }, []);


  return (
    <AuthLayout
      show_logo
      title={t('sign_in:welcome_dakota')}
      bottom_content={{
        title: [t('sign_in:dont_have_an_account'), t('common:create_account')],
        onPress: () => navigate('Auth', { screen: 'SignUp' }),
      }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryLeft={(props) => <Icon pack="assets" name="user" {...props} />}
            value={value ? `${value}` : ''}
            onBlur={onBlur}
            keyboardType="email-address"
            style={styles.input}
            onChangeText={onChange}
            status={errors.email ? 'danger' : 'primary'}
            placeholder={t('common:email_or_phone_number')}
          //caption={errors.email ? t('numberFormatError').toString() : ''}
          />
        )}
        name="email"
        rules={{ required: true, minLength: 8 }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryLeft={(props) => <Icon pack="assets" name="lock" {...props} />}
            value={value ? `${value}` : ''}
            onBlur={onBlur}
            style={styles.inputPassword}
            secureTextEntry={true}
            onChangeText={onChange}
            status={errors.password ? 'danger' : 'primary'}
            placeholder={t('common:password')}
          //caption={errors.password ? t('numberFormatError').toString() : ''}
          />
        )}
        name="password"
        //rules={rulePassword}
      />
      
      {/* <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigate('Auth', { screen: 'ForgotPassword' })}>
        <Text category="c1" status="basic" marginTop={16} right>
          {t('common:forgot_password')}?
        </Text>
      </TouchableOpacity> */}
    
      <Button disabled={loader} style={styles.button} children={loader?<ActivityIndicator />:t('common:sign_in')} onPress={handleSubmit(handleSignIn)} />
      {error && Object.keys(error).map((item:any, key)=>(
        <Text style={{color:"red"}} key={key}>
          {error?.[item]?.[0]}
        </Text>
      ))}
      <View style={styles.setRow}>
        <View style={[styles.line, { backgroundColor: theme['background-basic-color-3'] }]} />
        <Text marginHorizontal={24} category="b1" status="placeholder">
          {t('sign_in:or_sign_up_with')}
        </Text>
        <View style={[styles.line, { backgroundColor: theme['background-basic-color-3'] }]} />
      </View>
      {/* <View style={styles.viewSocial}>
        {social_media.map((item, index) => {
          const { icon, onPress } = item;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              key={index}
              style={[
                styles.viewIcon,
                {
                  backgroundColor: theme['background-basic-color-3'],
                  marginRight: index === social_media.length - 1 ? 0 : 16,
                },
              ]}>
              <Icon
                pack="assets"
                style={[styles.icon, { tintColor: theme['text-content-color'] }]}
                name={icon}
              />
            </TouchableOpacity>
          );
        })}
      </View> */}
    </AuthLayout>
  );
});

export default SignIn;

const styles = StyleSheet.create({
  input: {
    marginTop: 32,
  },
  inputPassword: {
    marginTop: 16,
  },
  button: {
    marginTop: 32,
  },
  setRow: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 1,
    flex: 1,
  },
  viewSocial: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  viewIcon: {
    width: 32,
    height: 32,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
  },
});
