import React, { ComponentType } from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleSheet } from 'react-native';
import { IconPack, IconProvider } from '@ui-kitten/components';
import { SvgProps } from 'react-native-svg';
import { Icons } from './icons';
import { SvgIcon } from 'components';

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: (props) => (
      <Image style={styles.icon} {...props} source={source} resizeMode="contain" />
    ),
  };
};

const createIconSvg = (source: ComponentType<SvgProps>): IconProvider<SvgProps> => {
  return new SvgIcon(source);
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetIconsPack: IconPack<ImageProps | SvgProps> = {
  name: 'assets',
  icons: {
    'arrow-down': createIcon(Icons['arrow-down']),
    'arrow-right': createIcon(Icons['arrow-right']),
    back: createIcon(Icons.back),
    card: createIcon(Icons.card),
    cart: createIcon(Icons.cart),
    close: createIcon(Icons.close),
    dhc: createIcon(Icons.dhc),
    divine: createIcon(Icons.divine),
    down: createIcon(Icons.down),
    next: createIcon(Icons.next),
    plus: createIcon(Icons.plus),
    save: createIcon(Icons.save),
    up: createIcon(Icons.up),
    lock: createIcon(Icons.lock),
    facebook: createIcon(Icons.facebook),
    google: createIcon(Icons.google),
    apple: createIcon(Icons.apple),
    exchange: createIcon(Icons.exchange),
    instagram: createIcon(Icons.instagram),
    twitter: createIcon(Icons.twitter),
    be: createIcon(Icons.be),
    pinterest: createIcon(Icons.pinterest),
    home: createIcon(Icons.home),
    'home-fill': createIcon(Icons['home-fill']),
    categories: createIcon(Icons.categories),
    'categories-fill': createIcon(Icons['categories-fill']),
    collection: createIcon(Icons.collection),
    'collection-fill': createIcon(Icons['collection-fill']),
    user: createIcon(Icons.user),
    'user-fill': createIcon(Icons['user-fill']),
    menu: createIcon(Icons.menu),
    search: createIcon(Icons.search),
    notification: createIcon(Icons.notification),
    heart: createIcon(Icons.heart),
    diamond: createIcon(Icons.diamond),
    option: createIcon(Icons.option),
    column: createIcon(Icons.column),
    'column-fill': createIcon(Icons['column-fill']),
    horizontal: createIcon(Icons.horizontal),
    'horizontal-fill': createIcon(Icons['horizontal-fill']),
    filter: createIcon(Icons.filter),
    'check-color': createIcon(Icons['check-color']),
    share: createIcon(Icons.share),
    car: createIcon(Icons.car),
    cod: createIcon(Icons.cod),
    policy: createIcon(Icons.policy),
    clock: createIcon(Icons.clock),
    photo: createIcon(Icons.photo),
    order: createIcon(Icons.order),
    phone: createIcon(Icons.phone),
    location: createIcon(Icons.location),
    check: createIcon(Icons.check),
    'pick-up': createIcon(Icons['pick-up']),
    delivered: createIcon(Icons.delivered),
    trash: createIcon(Icons.trash),
    address: createIcon(Icons.address),
    upload: createIcon(Icons.upload),
    processing: createIcon(Icons.processing),
    review: createIcon(Icons.review),
    cancel: createIcon(Icons.cancel),
    top: createIcon(Icons.top),
    bottom: createIcon(Icons.bottom),
    shoes: createIcon(Icons.shoes),
    watches: createIcon(Icons.watches),
    hat: createIcon(Icons.hat),
    edit: createIcon(Icons.edit),
    settings: createIcon(Icons.settings),
    activity: createIcon(Icons.activity),
    archive: createIcon(Icons.archive),
    'qr-code': createIcon(Icons['qr-code']),
    'log-out': createIcon(Icons['log-out']),
    minus: createIcon(Icons.minus),
    'heart-fill': createIcon(Icons['heart-fill']),
    message: createIcon(Icons.message),
  },
};

export default AssetIconsPack;
