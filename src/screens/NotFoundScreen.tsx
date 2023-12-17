import React, { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Container, Text } from 'components';
import { RootStackParamList } from 'navigation/types';

const NotFoundScreen = memo(({ navigation }: StackScreenProps<RootStackParamList, 'NotFound'>) => {
  return (
    <Container style={styles.container}>
      <Text>This screen doesn't exist.</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.replace('Drawer', { screen: 'MainBottomTab' })}
        style={styles.link}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </Container>
  );
});

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
