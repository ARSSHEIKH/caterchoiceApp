import React from 'react';
import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';
import { DrawerStackParamList } from 'navigation/types';

const useDrawer = () => {
  const { dispatch } = useNavigation<NavigationProp<DrawerStackParamList>>();

  const openDrawer = React.useCallback(() => {
    dispatch(DrawerActions.openDrawer());
  }, []);

  const closeDrawer = React.useCallback(() => {
    dispatch(DrawerActions.closeDrawer());
  }, []);

  return { openDrawer, closeDrawer };
};

export default useDrawer;
