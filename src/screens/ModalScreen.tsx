import React, { memo } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/types';
import { StatusScreen } from 'components';

type ModalScreenNavigationProp = RouteProp<RootStackParamList, 'ModalScreen'>;

const initValue = {
  goBack: true,
  status: 'failed',
  title: 'Oops!',
  description: 'Something went wrong somewhere.\nWould you like to try again?',
  children: [],
};

const ModalScreen = memo(() => {
  const route = useRoute<ModalScreenNavigationProp>();
  const { goBack, onGoBack, status, title, description, children, buttonsViewStyle } =
    route?.params?.modalScreen || initValue;

  return (
    <StatusScreen
      goBack={goBack}
      onGoBack={onGoBack}
      status={status}
      title={title}
      description={description}
      children={children}
      buttonsViewStyle={buttonsViewStyle}
    />
  );
});

export default ModalScreen;
