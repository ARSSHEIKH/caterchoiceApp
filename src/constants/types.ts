import { ImageRequireSource, ViewStyle } from 'react-native';
import { ButtonProps } from '@ui-kitten/components';
import { IconName } from 'assets/icons';

export interface ModalScreenType {
  status?: 'success' | 'failed';
  title?: string;
  description?: string;
  children?: ButtonType[] | null;
  goBack?: boolean;
  onGoBack?: () => void | undefined;
  buttonsViewStyle?: ViewStyle;
}
export interface ButtonType {
  status: string;
  title: string;
  onPress: () => void;
  id: number;
}

export interface OnboardingSpec {
  image: ImageRequireSource;
  title: string;
  description: string;
}

export interface TermSpec {
  title: string;
  description: string;
}

export interface BannerSpec {
  title: string;
  description?: string;
  button?: ButtonProps;
  image: string;
}

export interface CategoryFragment {
  id?: string;
  color: string;
  name: string;
  icon: keyof IconName;
}

export interface ProductFragment {
  id?: string;
  name?: string;
  price?: number;
  p_price?: number;
  category_id?: string;
  gender?: Gender_Types_Enum;
  image?: string;
  //about_item ([]String)
  //story(String)
  rate?: number;
  review?: ReviewFragment[];
  color?: string[];
  size?: string[];
  tags?: string[];
  is_sale?: boolean;
  price_sale?: number;
  is_wishlist:boolean|0|1;
  is_favourite:boolean;
  slug: string;
}

export interface ICollection {
  id?: string;
  name_collection?: string;
  images: string[];
}

export interface ICategoryItemState {
  id: number;
  name:string;
  product_count:number;
  images: string[];
}

export interface ReviewFragment {
  id?: string;
  product_id?: string;
  user_id?: string;
  User?: {
    avatar?: string;
    name?: string;
  };
  rate?: number;
  review?: string;
  time?: string;
  image?: string;
}

export interface OrderFragment {
  order_id: string;
  status: Order_Types_Enum;
  products: ProductFragment[];
}

export interface IChoosePhoto {
  title: string;
  type: ETypePhoto;
}

export interface ITrackOrder {
  icon: keyof IconName;
  title: string;
  description: string;
  time?: string;
  is_complete?: boolean;
}

export interface AddressFragment {
  name_address: string;
  address: string;
  phone_number: string;
  is_default?: boolean;
}

export interface CardFragment {
  name: string;
  card_number: number;
  exp_date: string;
  image: ImageRequireSource;
}

export interface MethodFragment {
  id: string;
  image: string;
}

export interface BlogFragment {
  image: string;
  title: string;
  time: string;
}

export interface VoucherFragment {
  name: string;
  discount?: number;
  is_free?: boolean;
  time?: string;
  is_expired?: boolean;
}

export interface CartFragment {
  id: string;
  image: string;
  name: string;
  colors: string[];
  color: string;
  sizes: string[];
  size: string;
  price: number;
  quantity: number;
}

export interface NewsFeedFragment {
  id: string;
  User: {
    avatar: string;
    name: string;
  };
  description: string;
  time: string;
  images: ImageFragment[];
}

export interface ImageFragment {
  image_url: string;
  likes: number;
  comments: number;
}

export enum Gender_Types_Enum {
  Female = 'Female',
  Male = 'Male',
}

export enum Order_Types_Enum {
  Shipped = 'Shipped',
  Processing = 'Processing',
  Unpaid = 'Unpaid',
  Return = 'Return',
}

export enum Grid_Types_Enum {
  Column = 'Column',
  Horizontal = 'Horizontal',
}

export enum Animation_Types_Enum {
  SlideTop,
  SlideBottom,
  SlideInRight,
  SlideInLeft,
}

export enum EKeyAsyncStorage {
  theme = 'theme',
  intro = 'intro',
}

export enum Size_Types_Enum {
  Inch = 'Inch',
  Cm = 'Cm',
}

export enum ETypePhoto {
  TAKE_PHOTO = 'TAKE_PHOTO',
  LIBRARY = 'LIBRARY',
}
