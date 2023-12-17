import React from 'react';

type BottomSheetContext = {
  close: () => void;
  expand: () => void;
};

export default React.createContext<BottomSheetContext>({
  close: () => {},
  expand: () => {},
});
