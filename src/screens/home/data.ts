import { Images } from 'assets/images';
import { BannerSpec, CategoryFragment } from 'constants/types';

type BannerType = {
  data: BannerSpec[];
};

export const data_banner: BannerType[] = [
  {
    data: [
      {
        title: 'Spring 2021\nSALE 50%',
        image:
          'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
      },
      {
        title: 'Banner 2',
        description: 'For summer collection',
        image:
          'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
      },
      {
        title: 'Banner 3',
        image:
          'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
      },
    ],
  },
  {
    data: [
      {
        title: 'Vallentine’s\nDay For Gift',
        image: Images.image37,
      },
    ],
  },
  {
    data: [
      {
        title: 'For summer\ncollection',
        image: Images.image36,
      },
    ],
  },
];

export const data_categories: CategoryFragment[] = [
  {
    id: '0',
    color: '#FFBC99',
    name: 'Top',
    icon: 'top',
  },
  {
    id: '1',
    color: '#FFBC99',
    name: 'Bottom',
    icon: 'bottom',
  },
  {
    id: '2',
    color: '#B1E5FC',
    name: 'Shoes',
    icon: 'shoes',
  },
  {
    id: '3',
    color: '#B5E4CA',
    name: 'Watches',
    icon: 'watches',
  },
  {
    id: '4',
    color: '#CABDFF',
    name: 'Hats',
    icon: 'hat',
  },
];

export const data_features: CategoryFragment[] = [
  {
    id: '0',
    color: '#FFBC99',
    name: 'Upload',
    icon: 'upload',
  },
  {
    id: '1',
    color: '#B1E5FC',
    name: 'Processing',
    icon: 'processing',
  },
  {
    id: '2',
    color: '#B5E4CA',
    name: 'Shipping',
    icon: 'car',
  },
  {
    id: '3',
    color: '#CABDFF',
    name: 'Review',
    icon: 'review',
  },
  {
    id: '4',
    color: '#FFD88D',
    name: 'Cancel',
    icon: 'cancel',
  },
];
