import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { ImageFragment, ModalScreenType } from 'constants/types';

export type IntroStackParamList = {
  Onboarding: undefined;
  Newsletter: undefined;
};

export type RootStackParamList = {
  Intro: IntroStackParamList;
  Auth: {
    screen: keyof AuthStackParamList;
  };
  //Home: undefined;
  Categories: NavigatorScreenParams<CategoriesStackParamList>;
  Product: {
    screen: keyof ProductStackParamList;
  };
  Drawer: {
    screen: keyof DrawerStackParamList;
  };
  BlogDetails: undefined;
  ProfileEdit: undefined;
  ImageDetail: { images: ImageFragment[] };
  NotFound: undefined;
  ModalScreen: {
    modalScreen: ModalScreenType;
  };
};

// Main Stack

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Verification: undefined;
  ChangePassword: undefined;
};

export type HomeStackParamList = {};

export type CategoriesStackParamList = {};

export type CollectionStackParamList = {};

export type ProductStackParamList = {
  ProductGrid: undefined;
  ProductDetails: undefined;
  ProductSize: undefined;
  ProductInformation: undefined;
  ProductReview: undefined;
  ProductReviewNew: undefined;
  BuildStyle: undefined;
  OrderDetails: undefined;
  OrderTracking: undefined;
  CheckOut: undefined;
  AddressDetails: undefined;
  AddAddress: undefined;
  MyAddress: undefined;
  MyCard: undefined;
  AddCard: undefined;
  MyCart: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};

// Bottom Tab Stack

export type HomeMainParamList = {
  HomeScreen: undefined;
  Product:undefined;
  MyOrder:undefined;
};

export type CategoriesMainParamList = {
  CategoriesScreen: undefined;
};

export type CollectionMainParamList = {
  CollectionScreen: undefined;
  Product: undefined;
};

export type ProfileMainParamList = {
  ProfileScreen: undefined;
};

export type CartMainParamList = {
  MyCart:undefined;
  Product:undefined;
}

export type MainStackParamList = {
  HomeMain: undefined;
  CategoriesMain: undefined;
  CollectionMain: undefined;
  MyCart: undefined;
  ProfileMain: undefined;
  Cart:undefined;
};

export type DrawerStackParamList = {
  MainBottomTab: {
    screen: keyof MainStackParamList;
  };
  MyFeed: undefined;
  MyOrder: undefined;
  MyVoucher: undefined;
  BlogFashion: undefined;
  MyCart: undefined;
  TermOfUse: undefined;
};

export type ImageDetailsNavigationProps = RouteProp<RootStackParamList, 'ImageDetail'>;
