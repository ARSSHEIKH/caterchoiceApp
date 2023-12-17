import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Content, FeatureItem, NavigationAction, Text, TitleBar } from 'components';
import { useTheme, Avatar, Icon, Input, Layout, TopNavigation } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {userSelector} from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from 'store/store';
import { Images } from 'assets/images';
import { RootStackParamList } from 'navigation/types';

interface FormValues {
  user_name: string;
  email: string;
  password: string;
}

const ProfileEdit = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation(['common', 'profile']);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const {user} = useAppSelector(userSelector);
  
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <Container>
      <TopNavigation
        title={t('profile:edit_profile').toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="option" onPress={() => {}} />}
      />
      <Content isPadding>
        {/* <TouchableOpacity activeOpacity={0.7} style={styles.avatar}>
          <Avatar size="80" source={{ uri: Images.avatar_3 }} />
          <Layout
            level="3"
            style={[
              styles.iconView,
              {
                borderColor: theme['background-basic-color-1'],
              },
            ]}>
            <Icon pack="assets" name="edit" style />
          </Layout>
        </TouchableOpacity> */}
        <Text category="h4" marginTop={12} center marginBottom={16}>
          {user?.data?.name}
        </Text>
        <TitleBar
          marginTop={24}
          marginBottom={8}
          title={t('profile:my_accounts')}
          // accessoryRight={{
          //   title: t('profile:reset_all'),
          //   onPress: () => {},
          // }}
        />
        {/* <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={<Icon pack="assets" name="user" />}
              value={value}
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.user_name ? 'danger' : 'primary'}
              placeholder={t('common:username').toString()}
            />
          )}
          name="user_name"
        /> */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              disabled
              accessoryLeft={<Icon pack="assets" name="phone" />}
              value={user?.data?.email}
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.email ? 'danger' : 'primary'}
              placeholder={t('common:email').toString()}
            />
          )}
          name="email"
        />
        {/* <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={<Icon pack="assets" name="location" />}
              value={value}
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.password ? 'danger' : 'primary'}
              placeholder={t('common:password').toString()}
            />
          )}
          name="password"
        /> */}
        <Text category="h6" marginTop={24}>
          {t('profile:information_detail')}
        </Text>
        <FeatureItem
          title={t('common:my_order')}
          onPress={() => navigate('Drawer', { screen: 'MyOrder' })}
        />
        {/* <FeatureItem
          title={t('common:my_voucher')}
          onPress={() => navigate('Drawer', { screen: 'MyVoucher' })}
        /> */}
        {/* <FeatureItem
          title={t('common:address_shipping')}
          onPress={() => navigate('Product', { screen: 'MyAddress' })}
        /> */}
      </Content>
    </Container>
  );
});

export default ProfileEdit;

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
    marginTop: 16,
  },
  iconView: {
    width: 25,
    height: 25,
    borderRadius: 25,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  icon: {
    width: 12,
    height: 12,
  },
  line: {
    height: 1,
  },
  input: {
    marginTop: 12,
  },
});
