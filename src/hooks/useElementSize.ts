import React from 'react';

const useElementSize = () => {
  const [size, setSize] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const onLayout = React.useCallback((e) => setSize(e.nativeEvent.layout), []);

  return {
    onLayout,
    size,
  };
};

export default useElementSize;
