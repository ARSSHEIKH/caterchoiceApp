import React from 'react';
import { MotiView } from 'moti';
import { StyleSheet } from 'react-native';
import { AuthLayout, Text } from 'components';
import { useTheme, Button, Layout } from '@ui-kitten/components';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
  CodeField,
} from 'react-native-confirmation-code-field';

import { AuthStackParamList } from 'navigation/types';

const Verification = React.memo(() => {
  const theme = useTheme();
  const { t } = useTranslation(['common', 'verification']);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const email = 'thanhhai.rw@gmail.com';
  const CELL_COUNT = 5;

  const [value, setValue] = React.useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  React.useEffect(() => {
    setTimeout(() => {
      ref.current?.focus();
    }, 1000);
  }, []);

  return (
    <AuthLayout title={t('verification:verification')}>
      <Text center marginTop={16} category="b1" status="description">
        {t('verification:enter_code_we_sent_on')}
        <Text center category="b2" status="basic">
          {email}
        </Text>
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <Layout
            level="2"
            key={index}
            style={[
              styles.cell,
              {
                borderColor: isFocused
                  ? theme['background-basic-color-6']
                  : theme['background-basic-color-5'],
              },
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text category="h5" status="content">
              {symbol ||
                (isFocused ? (
                  <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      loop: true,
                      type: 'timing',
                      duration: 500,
                      delay: 100,
                    }}
                    style={[styles.cursor, { backgroundColor: theme['text-content-color'] }]}
                  />
                ) : null)}
            </Text>
          </Layout>
        )}
      />
      <Button
        style={styles.button}
        children={t('common:confirm').toString()}
        onPress={() => navigate('ChangePassword')}
      />
    </AuthLayout>
  );
});

export default Verification;

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 40,
  },
  cell: {
    width: 48,
    height: 62,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 32,
  },
  cursor: {
    width: 2,
    height: 32,
    opacity: 0.5,
  },
});
