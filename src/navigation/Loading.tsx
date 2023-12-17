import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner } from '@ui-kitten/components';

import Container from 'components/Container';

const Loading = () => (
  <Container style={styles.container}>
    <Spinner />
  </Container>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading;
