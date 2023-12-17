import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, HideWithKeyboard } from "components";
import {
  Button,
  Icon,
  Input,
  CheckBox,
  useTheme,
  Layout,
  AutocompleteItem,
} from "@ui-kitten/components";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useBoolean } from "hooks";
import { Images } from "assets/images";
import { useLayout } from 'hooks';
import AuthLayout from 'components/AuthLayoutCustomize';
import { RootStackParamList } from "navigation/types";
import { Picker } from "@react-native-picker/picker";
import {
  signup,
  fetchWarehouse,
  userSelector,
  setLoader
} from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "store/store";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  location: string;
  address: string;
  phone_number: string;
  postcode: string;
  city: string;
}

const SignUp = React.memo((props) => {
  const { bottom } = useLayout();
  const { t } = useTranslation(["common", "sign_up"]);
  const {
    navigate,
    goBack,
    dispatch: ndispatch,
  } = useNavigation<NavigationProp<RootStackParamList>>();

  const [checked, { toggle }] = useBoolean(false);
  const dispatch = useAppDispatch();
  const { error, warehouses, loader }: any = useAppSelector(userSelector);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [isRegistered, setRegistered] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(setLoader(false));
    dispatch(fetchWarehouse(1, {}));    
  }, []);

  const nextScreen = React.useCallback(
    (screenName: keyof RootStackParamList) => {
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [
          {
            name: screenName,
          },
        ],
      });
      ndispatch(resetAction);
    },
    []
  );

  const handleSignUp = React.useCallback(async (data: any) => {
    const json = await dispatch(signup(data));
    if (json?.status == 200) {
      setRegistered(true)
      reset();
    }
  }, []);

  const renderOption = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  return (
   
   
       <AuthLayout
      title="Signup"
      is_success={isRegistered}
      modal_content={{
        title: t('common:success'),
        description: t('sign_up:sign_up_success'),
        title_button: t('sign_up:go_to_shopping_now'),
        onPress: () => goBack(),
      }}>
      <View style={[styles.container, {paddingBottom:bottom+60}]}>
        <Layout style={styles.logoView}>
         
            <Image
              style={[styles.logo]}
              source={Images.logo}
              resizeMode="contain"
            />
      
        </Layout>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="user" {...props} />
              )}
              value={value ? `${value}` : ""}
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.name ? "danger" : "primary"}
              placeholder={t("common:name")}
              caption={errors.name ? "required field" : ''}
            />
          )}
          name="name"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="user" {...props} />
              )}
              value={value ? `${value}` : ""}
              autoCapitalize='none'
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.email ? "danger" : "primary"}
              placeholder={t("common:email_or_phone_number")}
              caption={errors.email ?"required field" : ''}
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="address" {...props} />
              )}
              value={value ? `${value}` : ""}
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.address ? "danger" : "primary"}
              placeholder={t("Address")}
              caption={errors.address ? "required | min length 3" : ''}
            />
          )}
          name="address"
          rules={{ required: true, minLength: 3 }}
        />
         <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="phone" {...props} />
              )}
              value={value ? `${value}` : ""}
              onBlur={onBlur}
              style={styles.input}
              keyboardType={"phone-pad"}
              onChangeText={onChange}
              status={errors.phone_number ? "danger" : "primary"}
              placeholder={t("Phone Number")}
              caption={errors.phone_number ? "equired | min length 9" : ''}
            />
          )}
          name="phone_number"
          rules={{ required: true, minLength: 9 }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="user" {...props} />
              )}
              value={value ? `${value}` : ""}
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.postcode ? "danger" : "primary"}
              placeholder={t("Postcode")}
              caption={errors.postcode ? "equired | min length 4" : ''}
            />
          )}
          name="postcode"
          rules={{ required: true, minLength: 4 }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="location" {...props} />
              )}
              value={value ? `${value}` : ""}
              onBlur={onBlur}
              style={styles.input}
              onChangeText={onChange}
              status={errors.city ? "danger" : "primary"}
              placeholder={t("City")}
              caption={errors.city ? "equired | min length 3" : ''}
            />
          )}
          name="city"
          rules={{ required: true, minLength: 3 }}
        />
        <Text style={{opacity:0.5, alignSelf:"center", marginTop:10}}>Location</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
            >
              <Picker.Item  label={"Select location"} value={0} />
              {(warehouses || []).map((item, key) => (
                <Picker.Item key={key} label={item.name} value={item.id} />
              ))}
            </Picker>
          )}
          name="location"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="lock" {...props} />
              )}
              autoCapitalize='none'
              secureTextEntry={true}
              value={value ? `${value}` : ""}
              onBlur={onBlur}
              style={styles.inputPassword}
              onChangeText={onChange}
              status={errors.password ? "danger" : "primary"}
              placeholder={t("common:password")}
              //caption={errors.password ? t('numberFormatError').toString() : ''}
            />
          )}
          name="password"
          //rules={rulePassword}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={(props) => (
                <Icon pack="assets" name="exchange" {...props} />
              )}
              value={value ? `${value}` : ""}
              secureTextEntry={true}
              autoCapitalize='none'
              onBlur={onBlur}
              style={styles.inputPassword}
              onChangeText={onChange}
              status={errors.confirm_password ? "danger" : "primary"}
              placeholder={t("common:repeat_password")}
              //caption={errors.confirm_password ? t('numberFormatError').toString() : ''}
            />
          )}
          name="confirm_password"
          //rules={ruleRePassword}
        />
        <View>
          {error &&
            Object.keys(error).map((item: any, key) => (
              <Text style={{ color: "red" }} key={key}>
                {error?.[item]?.[0]}
              </Text>
            ))}
        </View>
        <CheckBox style={styles.checkbox} checked={checked} onChange={toggle}>
          {(props) => (
            <View {...props}>
              <Text status="body" category="c2">
                {t("sign_up:i_accept")}
                <Text status="basic" category="c1">
                  {t("sign_up:terms")}
                </Text>
              </Text>
            </View>
          )}
        </CheckBox>
        <Button
          disabled={loader}
          style={styles.button}
          children={loader? <ActivityIndicator />: t("sign_up:sign_up")}
          onPress={handleSubmit(handleSignUp)}
        />
      </View>
      <HideWithKeyboard
              style={[
                styles.viewBottom,
                { backgroundColor: theme['background-basic-color-1'], paddingBottom:bottom+16 },
              ]}>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>goBack()}>
                <Text category="b3" status="body" center>
                  {t('common:already_have_an_account')}
                  <Text status="basic" category="b5">
                    {t('common:join_with_us')}
                  </Text>
                </Text>
              </TouchableOpacity>
            </HideWithKeyboard>
            </AuthLayout>
   
  );
});

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 60,
    backgroundColor:"#fff"
  },
  logoView: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    //marginTop: -70 / 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  logoContent: {
    width: 90,
    height: 90,
    borderRadius: 56 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  viewBottom: {
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 8,
    position: 'absolute',
    zIndex: 10,
  },
  logo: {
    width: 200,
    height: 200,
  },
  input: {
    marginTop: 32,
  },
  inputPassword: {
    marginTop: 16,
  },
  button: {
    zIndex:90,
    marginTop: 32,
  },
  checkbox: {
    marginTop: 24,
  },
});
