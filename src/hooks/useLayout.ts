import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useLayout = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const bottomButton = bottom + 48 + 16 + 8;

  return { width, height, top, bottom, bottomButton };
};

export default useLayout;
