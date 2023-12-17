import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TopNavigation, useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLayout } from 'hooks';

import { Container, Content, Text } from 'components';

const AddressDetails = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { t } = useTranslation(['common']);
  const { height, width, top, bottom } = useLayout();

  return (
    <Container>
      <TopNavigation />
      <Content>
        <Text>AddressDetails</Text>
      </Content>
    </Container>
  );
});

export default AddressDetails;

const styles = StyleSheet.create({});
