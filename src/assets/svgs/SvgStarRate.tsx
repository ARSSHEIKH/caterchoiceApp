import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SvgComponent = (props: SvgProps) => (
  <Svg width="31" height="30" viewBox="0 0 31 30" fill="none" {...props}>
    <Path d="M13.8397 1.9083C14.4439 0.0486199 17.0749 0.0486245 17.6791 1.90831L19.8381 8.55286C20.1083 9.38453 20.8833 9.94762 21.7578 9.94762H28.7443C30.6997 9.94762 31.5127 12.4498 29.9307 13.5992L24.2786 17.7057C23.5711 18.2197 23.2751 19.1308 23.5453 19.9625L25.7042 26.607C26.3085 28.4667 24.18 30.0132 22.598 28.8638L16.9459 24.7572C16.2384 24.2432 15.2804 24.2432 14.5729 24.7572L8.92075 28.8638C7.33881 30.0132 5.21033 28.4667 5.81457 26.607L7.97352 19.9625C8.24375 19.1308 7.94772 18.2197 7.24025 17.7057L1.58805 13.5992C0.00611351 12.4498 0.819128 9.94762 2.77451 9.94762H9.76101C10.6355 9.94762 11.4105 9.38453 11.6807 8.55286L13.8397 1.9083Z" />
  </Svg>
);

const SvgStarRate = React.memo(SvgComponent);
export default SvgStarRate;
