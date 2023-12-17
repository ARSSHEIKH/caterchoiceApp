import React from 'react';
import BottomSheetContext from '../../BottomSheetContext';

const useAppBottomSheet = () => {
  const appBottomSheet = React.useContext(BottomSheetContext);
  return appBottomSheet;
};

export default useAppBottomSheet;
