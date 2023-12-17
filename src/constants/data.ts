import { Images } from 'assets/images';
import { BannerSpec, ICollection, ProductFragment, NewsFeedFragment } from './types';

export const products_list: ProductFragment[] = [
  {
    id: '0',
    is_sale: true,
    images: [Images.image8],
    tags: ['TOP', 'JACKET'],
    name_product: 'Lipsy lace body dress in black',
    price_origin: 299,
    price_sale: 233,
  },
  {
    id: '1',
    is_sale: true,
    images: [Images.image9],
    tags: ['WATCHES'],
    name_product: 'Lion head ring with crystal',
    price_origin: 67,
    price_sale: 42,
  },
  {
    id: '2',
    is_sale: true,
    images: [Images.image10],
    tags: ['SHOES'],
    name_product: `Children's loafer with Web`,
    price_origin: 800,
    price_sale: 786,
  },
  {
    id: '3',
    is_sale: true,
    images: [Images.image11],
    tags: ['BAG'],
    name_product: 'NA-KD shirred smock dress',
    price_origin: 50,
    price_sale: 23,
  },
  {
    id: '4',
    is_sale: true,
    images: [Images.image12],
    tags: ['TOP', 'POLO'],
    name_product: 'Flounce scoop neck ribbed ',
    price_origin: 500,
    price_sale: 453,
  },
  {
    id: '5',
    is_sale: true,
    images: [Images.image13],
    tags: ['TOP', 'JACKET'],
    name_product: 'Brave Soul notch neck short',
    price_origin: 200,
    price_sale: 154,
  },
];

export const collections: ICollection[] = [
  {
    name_collection: 'Popular Summer Collaboration',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
];

export const popular_collections: ICollection[] = [
  {
    name_collection: 'Popular Summer Collaboration',
    images: [Images.image15, Images.jacket, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
];

export const new_collections: ICollection[] = [
  {
    name_collection: 'Hot Summer',
    images: [Images.hot_summer, Images.image17, Images.image16],
  },
  {
    name_collection: 'Merry Christmas',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
  {
    name_collection: 'New Arrival',
    images: [Images.image15, Images.image16, Images.image17],
  },
];

export const recent_list: ProductFragment[] = [
  {
    id: '0',
    is_sale: true,
    images: [Images.image8],
    tags: ['TOP', 'JACKET'],
    name_product: 'Lipsy lace body dress in black',
    price_origin: 299,
    price_sale: 233,
  },
  {
    id: '1',
    is_sale: true,
    images: [Images.image9],
    tags: ['WATCHES'],
    name_product: 'Lion head ring with crystal',
    price_origin: 67,
    price_sale: 42,
  },
  {
    id: '2',
    is_sale: true,
    images: [Images.image10],
    tags: ['SHOES'],
    name_product: `Children's loafer with Web`,
    price_origin: 800,
    price_sale: 786,
  },
  {
    id: '3',
    is_sale: true,
    images: [Images.image11],
    tags: ['BAG'],
    name_product: 'NA-KD shirred smock dress',
    price_origin: 50,
    price_sale: 23,
  },
  {
    id: '4',
    is_sale: true,
    images: [Images.image12],
    tags: ['TOP', 'POLO'],
    name_product: 'Flounce scoop neck ribbed ',
    price_origin: 500,
    price_sale: 453,
  },
  {
    id: '5',
    is_sale: true,
    images: [Images.image13],
    tags: ['TOP', 'JACKET'],
    name_product: 'Brave Soul notch neck short',
    price_origin: 200,
    price_sale: 154,
  },
];

export const data_banner_categories: BannerSpec[] = [
  {
    title: 'Valentine’s Day\nFor Gift',
    description: 'For summer collection',
    image:
      'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
  },
  {
    title: 'Valentine’s Day\nFor Gift',
    description: 'For summer collection',
    image:
      'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
  },
  {
    title: 'Valentine’s Day\nFor Gift',
    description: 'For summer collection',
    image:
      'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
  },
];

export const data_banner_product_grid: BannerSpec[] = [
  {
    title: 'New Arrival',
    description: 'For summer collection',
    image:
      'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
  },
  {
    title: 'New Arrival',
    description: 'For summer collection',
    image:
      'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
  },
  {
    title: 'New Arrival',
    description: 'For summer collection',
    image:
      'https://user-images.githubusercontent.com/42206067/179152246-106e0948-78ac-4e25-9968-2e4c017daecd.png',
  },
];

export const data_colors = [
  '#B5E4CA',
  '#FFBC99',
  '#B1E5FC',
  '#CABDFF',
  '#FFD88D',
  '#5A5A59',
  '#EBFF99',
  '#FCB1E2',
  '#BDFBFF',
  '#FFFFFF',
];

export const data_sizes = ['xs', 's', 'm', 'l', 'xl', '2xl', '3xl'];

export const data_blogs = [
  {
    image: Images.image19,
    title: `Expressed through look Alessandro Michele's`,
    time: '10 days ago',
  },
  {
    image: Images.image18,
    title: 'Curved half-moon shape and its defining...',
    time: '9 days ago',
  },
];

export const data_tags = [
  {
    title: 'HipHop',
    color: '#FFBC99',
  },
  {
    title: 'Best Seller',
    color: '#B1E5FC',
  },
  {
    title: 'Jacket',
    color: '#CABDFF',
  },
];

export const data_news_feed: NewsFeedFragment[] = [
  {
    id: '0',
    User: {
      avatar: Images.avatar,
      name: 'Christine Stewart',
    },
    description: 'Non-fungible tokens seem to have exploded out of the ether this year.',
    time: '2 days ago',
    images: [
      {
        image_url: Images.image35,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image30,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image31,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image32,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image33,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image34,
        likes: 139,
        comments: 248,
      },
    ],
  },
  {
    id: '1',
    User: {
      avatar: Images.avatar,
      name: 'Christine Stewart',
    },
    description: 'Non-fungible tokens seem to have exploded out of the ether this year.',
    time: '2 days ago',
    images: [
      {
        image_url: Images.image35,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image30,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image31,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image32,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image33,
        likes: 139,
        comments: 248,
      },
      {
        image_url: Images.image34,
        likes: 139,
        comments: 248,
      },
    ],
  },
];
