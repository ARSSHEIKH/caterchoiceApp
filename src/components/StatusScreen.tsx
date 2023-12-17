import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Layout, Button } from '@ui-kitten/components';

import Text from './Text';
import Container from './Container';

import { Images } from 'assets/images';
import { ModalScreenType } from 'constants/types';

const StatusScreen: React.FC<ModalScreenType> = React.memo(
  ({ status, title, description, children, buttonsViewStyle }) => {
    return (
      <Container style={styles.container}>
        <Layout style={styles.top}>
          {status === 'success' ? (
            <Image style={styles.image} source={{ uri: Images.success }} />
          ) : status === 'failed' ? (
            <Image style={styles.image} source={{ uri: Images.failed }} />
          ) : (
            <View />
          )}
          <Text center category="h3" marginTop={24}>
            {title}
          </Text>
          <Text category="b1" center marginTop={8}>
            {description}
          </Text>
        </Layout>
        <Layout style={[styles.bottom, buttonsViewStyle]}>
          {!!children &&
            children.map((i, index: number) => {
              const { status: _status, title: _title, onPress } = i;
              return (
                <Button
                  style={styles.button}
                  key={index}
                  children={_title}
                  status={_status}
                  onPress={onPress}
                />
              );
            })}
        </Layout>
      </Container>
    );
  }
);

export default StatusScreen;

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',
    height: 269,
  },
  top: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});
