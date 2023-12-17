import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Input, CheckBox } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useBoolean } from 'hooks';

import AuthLayout from 'components/AuthLayout';

import { Images } from 'assets/images';
import { AuthStackParamList } from 'navigation/types';
import { rulePassword, ruleRePassword } from 'utils/rules';

interface FormValues {
  password: string;
  new_password: string;
}

const ChangePassword = React.memo(() => {
  const { t } = useTranslation(['common', 'change_password']);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const [checked, { toggle }] = useBoolean(false);

  const {
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const [changedPassword, setChangedPassword] = React.useState<boolean>(false);

  return (
    <AuthLayout
      title={t('change_password:change_password')}
      is_success={changedPassword}
      modal_content={{
        title: t('common:success'),
        description: t('change_password:change_password_success'),
        image: Images.image_success_2,
        title_button: t('common:sign_in'),
        onPress: () => navigate('SignIn'),
      }}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryLeft={(props) => <Icon pack="assets" name="lock" {...props} />}
            value={value ? `${value}` : ''}
            onBlur={onBlur}
            style={styles.input}
            onChangeText={onChange}
            status={errors.password ? 'danger' : 'primary'}
            placeholder={t('common:password')}
            //caption={errors.password ? t('numberFormatError').toString() : ''}
          />
        )}
        name="password"
        rules={rulePassword}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            accessoryLeft={(props) => <Icon pack="assets" name="exchange" {...props} />}
            value={value ? `${value}` : ''}
            onBlur={onBlur}
            style={styles.inputPassword}
            onChangeText={onChange}
            status={errors.new_password ? 'danger' : 'primary'}
            placeholder={t('change_password:confirm_new_password')}
            //caption={errors.password ? t('numberFormatError').toString() : ''}
          />
        )}
        name="new_password"
        rules={ruleRePassword}
      />
      <CheckBox style={styles.checkbox} checked={checked} onChange={toggle}>
        {t('change_password:save_new_password')}
      </CheckBox>
      <Button
        style={styles.button}
        children={t('common:submit')}
        onPress={() => setChangedPassword(true)}
      />
    </AuthLayout>
  );
});

export default ChangePassword;

const styles = StyleSheet.create({
  input: {
    marginTop: 40,
  },
  inputPassword: {
    marginTop: 16,
  },
  button: {
    marginTop: 32,
  },
  checkbox: {
    marginTop: 16,
  },
});
