import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'components';
import { Button, Icon, Input } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AuthLayout from 'components/AuthLayout';

import { AuthStackParamList } from 'navigation/types';

interface FormValues {
  email: string;
}

const ForgotPassword = React.memo(() => {
  const { t } = useTranslation(['common', 'forgot_password']);
  const { navigate, goBack } = useNavigation<NavigationProp<AuthStackParamList>>();

  const {
    control,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <AuthLayout
      title={t('common:forgot_password')}
      bottom_content={{
        title: [t('common:already_have_an_account'), t('common:join_with_us')],
        onPress: () => goBack(),
      }}>
      <Text center marginTop={16} category="b1" status="description">
        {t('forgot_password:dont_worry')}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryLeft={(props) => <Icon pack="assets" name="user" {...props} />}
            value={value ? `${value}` : ''}
            onBlur={onBlur}
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
      <Button
        style={styles.button}
        children={t('common:confirm')}
        onPress={() => navigate('Verification')}
      />
    </AuthLayout>
  );
});

export default ForgotPassword;

const styles = StyleSheet.create({
  input: {
    marginTop: 40,
  },
  button: {
    marginTop: 24,
  },
});
