import React from 'react';
import { FlatList, StyleSheet, View, KeyboardAvoidingView, Platform, Pressable, ActivityIndicator } from 'react-native';
import {
  AddressItem,
  CardItem,
  Container,
  Content,
  MethodItem,
  NavigationAction,
  Text,
  TitleBar,
} from 'components';
import { IndexPath, Button, Layout, TopNavigation, Icon, Radio, RadioGroup, Input, Modal, Calendar } from '@ui-kitten/components';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'store/store';
import { useLayout } from 'hooks';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';

import { Images } from 'assets/images';
import { currency, paymentUrl } from "../../constants/common";
import keyExtractor from 'utils/keyExtractor';
import { RootStackParamList } from 'navigation/types';
import { addressSelector } from 'store/slices/addressSlice';
import { CardFragment, MethodFragment } from 'constants/types';
import { orderSelector, setExtra, fetchAvailableSlots, submitOrder } from "../../store/slices/orderSlice";
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native'
import { web } from '../../constants/common';
import { actualPrice } from 'screens/order/MyCart';
import { openLink } from 'utils/openLink';
import Api from 'services/api';



const data_payment: CardFragment[] = [];

const data_method: MethodFragment[] = [
  {
    id: '0',
    image: Images.method_1,
  },
  {
    id: '1',
    image: Images.method_2,
  },
  {
    id: '2',
    image: Images.method_3,
  },
];

interface FormValues {
  email: string;
  phone_number: string;
  country: string;
  address: string;
  postal_code: string;
  pickup_date: string;
}

const CheckOut = React.memo(() => {
  const { width, bottom, bottomButton } = useLayout();
  const { t } = useTranslation(['common']);
  const { address } = useAppSelector(addressSelector);
  const { navigate, dispatch: nDispatch } = useNavigation<NavigationProp<RootStackParamList>>();
  const now = new Date();
  const tomorrow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  const dispatch = useAppDispatch();

  const { cart, extra, slots, error, loader } = useAppSelector(orderSelector);

  const [method, setMethod] = React.useState<MethodFragment>(data_method[0]);
  const [visible, setVisible] = React.useState<boolean>(false);

  const currentDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(currentDate.getMonth() + 3);


  if (currentDate.getMonth() > 8) {
    maxDate.setFullYear(currentDate.getFullYear() + 1)
  }

  const renderCardItem = React.useCallback(({ item }: { item: CardFragment }) => {
    return <CardItem item={item} style={styles.card} />;
  }, []);

  const changeMethod = (index: any): void => {
    dispatch(setExtra({ shipping_method: index }));
  }

  React.useEffect(() => {
    if (!("shipping_method" in extra)) {
      addForm("shipping_method", 1);
    }

  }, [extra?.shipping_method]);

  React.useEffect(() => {
    if (!("pickup_date" in extra)) {
      const currentDate = (new Date()).toISOString();
      addForm("pickup_date", currentDate);
      availableSlots(currentDate)
    }
  }, []);

  const addForm = (key: any, value: any): void => {
    const form: any = Object.assign({}, extra);
    form[key] = value;
    if (key == "slot") {
      form["selectedSlot"] = slots?.[value];
    }
    dispatch(setExtra(form));
  }

  const availableSlots = (time: string) => {
    dispatch(fetchAvailableSlots({ time: moment(time).format('YYYY-MM-DD') + " " + moment.utc().local().format('HH:mm'), date: moment.utc().local().format('YYYY-MM-DD') }))
  }

  const submit = async () => {
    let data: any = {};
    data['cart'] = cart
    data['extra'] = extra;
    const json = await dispatch(submitOrder(data));
    const orderId = json?.data?.data?.id
    navigate('OrderCompleted', {orderId})
      // const response = await Api.orderStatus(orderId)
      // if (response.status == 200)
      //   navigate('ModalScreen', {
      //     modalScreen: {
      //       status: 'success',
      //       title: 'Success!',
      //       description: 'Thank you for purchasing\nYour order will be shipped in few day',
      //       children: [
      //         {
      //           status: 'primary',
      //           title: 'Go Shopping',
      //           onPress: () => {
      //             nDispatch(
      //               CommonActions.reset({
      //                 index: 1,
      //                 routes: [
      //                   { name: 'Drawer', },
      //                 ],
      //               })
      //             );
      //           },
      //           id: 0,
      //         },
      //       ],
      //     },
      //   })
      // const url = `${paymentUrl}/${orderId}`;
      // openLink(url)
    

  }

  const {
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const renderMethodItem = React.useCallback(
    ({ item }: { item: MethodFragment }) => {
      return (
        <MethodItem
          item={item}
          style={styles.method}
          is_selected={method.id === item.id}
          onPress={() => setMethod(item)}
        />
      );
    },
    [method]
  );

  const getTotal = () => {
    return cart.reduce(
      (total, item) => total + (item.quantity || 0) * (actualPrice(item) || 0) + item.quantity * (((actualPrice(item) || 0) * (item.tax || 0)) / 100),
      0
    ).toFixed(2);
  }

  console.log("extra", extra?.pickup_date ? typeof (extra?.pickup_date) == "object" ? extra?.pickup_date : new Date(extra?.pickup_date) : new Date());


  return (
    <Container>
      <TopNavigation
        title={t('common:check_out').toString()}
        accessoryLeft={<NavigationAction />}
      // accessoryRight={<NavigationAction icon="option" />}
      />
      <Content contentContainerStyle={{ paddingBottom: bottomButton }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? bottom + 100 : 0}>
          {/* <TitleBar
          paddingHorizontal={16}
          title={t('common:shipping_address')}
          accessoryRight={{
            title: t('common:change'),
            onPress: () => navigate('Product', { screen: 'MyAddress' }),
          }}
        />
        <AddressItem item={address} style={styles.item} />
        <TitleBar
          paddingHorizontal={16}
          marginBottom={16}
          marginTop={24}
          title={t('common:payment')}
          accessoryRight={{
            title: t('common:change'),
            onPress: () => navigate('Product', { screen: 'MyCard' }),
          }}
        />
        <FlatList
          data={data_payment}
          renderItem={renderCardItem}
          horizontal
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          snapToInterval={width - 72}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
        /> */}
          {/* <TitleBar
          paddingHorizontal={16}
          marginTop={24}
          marginBottom={16}
          title={t('common:delivery_method')}
          accessoryRight={{
            title: t('common:see_all'),
            onPress: () => {},
          }}
        /> */}
          {/* <FlatList
          data={data_method}
          renderItem={renderMethodItem}
          horizontal
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEventThrottle={16}
          snapToInterval={(width - (80 + 16 + 8)) / 2}
          bounces={false}
          pagingEnabled={false}
          decelerationRate="fast"
        /> */}
          <View style={styles.row}>
            <Text category="b1" status="description">
              {t('common:sub_total')}:
            </Text>
            <Text category="t1">{currency}{getTotal()}</Text>
          </View>
          <View style={styles.row}>
            <Text category="b1" status="description">
              {t('common:Shipping')}:
            </Text>
            <Text category="t1">Free</Text>
          </View>
          <View style={styles.row}>
            <Text category="b1" status="description">
              {t('common:total')}:
            </Text>
            <Text category="t1">{currency}{getTotal()}</Text>
          </View>
          <TitleBar
            paddingHorizontal={16}
            marginTop={24}
            marginBottom={16}
            title={t('Shipping method')}
          />
          <View style={styles.row}>
            <RadioGroup
              selectedIndex={(extra?.shipping_method || 0)}
              onChange={index => addForm("shipping_method", index)}
            >
              <Radio disabled>Delivery (Coming soon)</Radio>
              <Radio checked>Self Pick</Radio>
            </RadioGroup>
          </View>

          {extra?.shipping_method == 0 &&
            <>
              <View style={styles.form}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      accessoryLeft={<Icon pack="assets" name="user" />}
                      value={extra?.email}
                      onBlur={onBlur}
                      style={styles.input}
                      //onChangeText={onChange}
                      onChangeText={text => addForm("email", text)}
                      status={errors.email ? 'danger' : 'primary'}
                      placeholder={t('Email Address').toString()}
                    />
                  )}
                  name="email"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      accessoryLeft={<Icon pack="assets" name="phone" />}
                      keyboardType={"number-pad"}
                      value={extra?.phone_number}
                      onBlur={onBlur}
                      style={styles.input}
                      onChangeText={text => addForm("phone_number", text)}
                      status={errors.email ? 'danger' : 'primary'}
                      placeholder={t('Phone Number').toString()}
                    />
                  )}
                  name="phone_number"
                />
              </View>
              <View style={styles.row}>
                <Text>Country</Text>
                <Text>United Kingdom</Text>
              </View>
              <View style={styles.form}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      accessoryLeft={<Icon pack="assets" name="address" />}
                      value={extra?.address}
                      multiline
                      onBlur={onBlur}
                      style={styles.input}
                      onChangeText={text => addForm("address", text)}
                      status={errors.email ? 'danger' : 'primary'}
                      placeholder={t('Address').toString()}
                    />
                  )}
                  name="address"
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      accessoryLeft={<Icon pack="assets" name="user" />}
                      value={extra?.postal_code}
                      onBlur={onBlur}
                      style={styles.input}
                      onChangeText={text => addForm("postal_code", text)}
                      status={errors.email ? 'danger' : 'primary'}
                      placeholder={t('Postal code').toString()}
                    />
                  )}
                  name="postal_code"
                />
              </View>
            </>
          }
          {extra?.shipping_method == 1 &&
            <>
              <View style={[styles.row]}>
                <Text>Pickup Date: </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Pressable style={[styles.row]} onPress={() => setVisible(true)}>
                      <Text>{moment(extra?.pickup_date).format('YYYY-MM-DD') || "Select Date"} </Text>
                      <Icon name='down' pack='assets' />
                    </Pressable>
                  )}
                  name="pickup_date"
                />
              </View>
              <RadioGroup
                style={styles.slots}
                selectedIndex={(extra?.slot)}
                onChange={index => addForm("slot", index)}
              >
                {(slots || [])?.map((item, key) => (
                  // <View>
                  <Radio style={styles.slotOption} key={key}>{item}</Radio>
                  // </View>
                ))}

              </RadioGroup>
            </>
          }

        </KeyboardAvoidingView>
        <View style={styles.form}>
          {(Object.keys(error) || [])?.map((item, key) => (
            <Text style={{ color: "red", fontSize: 13 }} key={key}>{(error?.[item]?.[0] || "").replace("extra.", "")}</Text>
          ))}
        </View>
      </Content>

      <Layout style={[styles.buttonView, { padding: bottom + 16 + 48 }]}>
        <Button
          disabled={loader}
          children={loader ? <ActivityIndicator /> : t('common:check_out').toString()}
          onPress={submit}
        />
      </Layout>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Calendar
          style={{ backgroundColor: "#fff", borderRadius: 0 }}
          max={maxDate}

          onSelect={nextDate => {

            addForm("pickup_date", (nextDate))
            setVisible(false);
            availableSlots(nextDate);

          }}
        // date={extra?.pickup_date ? typeof (extra?.pickup_date) == "object" ? extra?.pickup_date : new Date(extra?.pickup_date) : new Date()}
        />
      </Modal>
    </Container>
  );
});

export default CheckOut;

const styles = StyleSheet.create({
  item: {
    marginTop: 16,
    marginRight: 16,
  },
  contentContainerStyle: {
    paddingLeft: 16,
    marginBottom: 32,
  },
  card: {
    marginRight: 16,
  },
  method: {
    marginRight: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  form: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  buttonView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 8,
    paddingHorizontal: 32,
  },
  input: {
    marginTop: 12,
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
    minHeight: 128,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  slots: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 50,
    marginHorizontal: 15,
    // backgroundColor: 'aqua'
    // justifyContent: 'space-evenly'
  },
  slotOption: {
    width: "30%",
    paddingHorizontal: 5,
    paddingVertical: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 5.62,
    borderWidth: 0.1,
    marginHorizontal: 5
  }
});
