import React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

interface SvgLineProps extends SvgProps {
  is_complete?: boolean;
}

const SvgComponent = ({ is_complete, ...props }: SvgLineProps) => (
  <Svg width={2} height={90} fill="none" {...props}>
    <Path
      d="M.5 89.5a.5.5 0 0 0 1 0h-1ZM.5 0v2.034h1V0h-1Zm0 6.102v4.069h1V6.102h-1Zm0 8.137v4.068h1v-4.068h-1Zm0 8.136v4.068h1v-4.068h-1Zm0 8.136v4.069h1V30.51h-1Zm0 8.137v4.068h1v-4.068h-1Zm0 8.136v4.068h1v-4.068h-1Zm0 8.136v4.069h1V54.92h-1Zm0 8.137v4.068h1v-4.068h-1Zm0 8.136v4.068h1v-4.068h-1Zm0 8.137v4.068h1V79.33h-1Zm0 8.136V89.5h1v-2.034h-1Z"
      fill={is_complete ? '#121314' : '#BAB8B7'}
    />
  </Svg>
);

const SvgLine = React.memo(SvgComponent);
export default SvgLine;
