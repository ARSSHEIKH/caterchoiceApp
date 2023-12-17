import React from 'react';
import ThemeContext from '../../ThemeContext';

const useAppTheme = () => {
  const appTheme = React.useContext(ThemeContext);
  return appTheme;
};

export default useAppTheme;
