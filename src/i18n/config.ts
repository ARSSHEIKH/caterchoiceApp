import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

//En
import common from './en/common.json';
import intro from './en/intro.json';
import new_letters from './en/new_letters.json';
import sign_in from './en/sign_in.json';
import sign_up from './en/sign_up.json';
import forgot_password from './en/forgot_password.json';
import verification from './en/verification.json';
import change_password from './en/change_password.json';
import term_of_use from './en/term_of_use.json';
import home from './en/home.json';
import categories from './en/categories.json';
import collection from './en/collection.json';
import product from './en/product.json';
import product_details from './en/product_details.json';
import product_size from './en/product_size.json';
import review from './en/review.json';
import order from './en/order.json';
import address from './en/address.json';
import card from './en/card.json';
import blog from './en/blog.json';
import profile from './en/profile.json';

export const defaultNS = 'common';
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      intro: typeof intro;
      new_letters: typeof new_letters;
      sign_in: typeof sign_in;
      sign_up: typeof sign_up;
      forgot_password: typeof forgot_password;
      verification: typeof verification;
      change_password: typeof change_password;
      term_of_use: typeof term_of_use;
      home: typeof home;
      categories: typeof categories;
      collection: typeof collection;
      product: typeof product;
      product_details: typeof product_details;
      product_size: typeof product_size;
      review: typeof review;
      order: typeof order;
      address: typeof address;
      card: typeof card;
      blog: typeof blog;
      profile: typeof profile;
    };
  }
}

export const resources = {
  en: {
    common,
    intro,
    new_letters,
    sign_in,
    sign_up,
    forgot_password,
    verification,
    change_password,
    term_of_use,
    home,
    categories,
    collection,
    product,
    product_details,
    product_size,
    review,
    order,
    address,
    card,
    blog,
    profile,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  compatibilityJSON: 'v3',
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: true,
  },
});

i18n.on('languageChanged', (lng) => {
  dayjs.locale(lng);
});
