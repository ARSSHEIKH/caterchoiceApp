import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, NavigationAction, Text } from 'components';
import {
  useTheme,
  TopNavigation,
  Input,
  Icon,
  Toggle,
  Layout,
  Button,
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { useBoolean, useCustomMap, useLayout } from 'hooks';
import { useTranslation } from 'react-i18next';

import { Icons } from 'assets/icons';
import { locationPermission } from 'utils/locationPermission';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';

interface IStateProps {
  curLoc: {
    latitude: number;
    longitude: number;
  };
  destinationCords?: { latitude: number; longitude: number };
  isLoading: boolean;
  coordinate: AnimatedRegion;
  time: number;
  distance: number;
  heading: number;
}

const AddAddress = React.memo(() => {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { t } = useTranslation(['common', 'address']);
  const { bottom, bottomButton } = useLayout();
  const [checked, { toggle }] = useBoolean(false);
  //@ts-ignore
  const markerRef = React.useRef<Marker>(null);
  const refMap = React.useRef<MapView>(null);
  const { CustomMapStyle, ASPECT_RATIO } = useCustomMap();

  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [state, setState] = React.useState<IStateProps>({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });
  const { curLoc, heading } = state;

  React.useEffect(() => {
    locationPermission().catch((err) => {
    });
  }, []);

  const renderMarker = React.useCallback(() => {
    return (
      <Marker
        ref={markerRef}
        //@ts-ignore
        icon={Icons.location}
        pinColor={theme['text-danger-color']}
        coordinate={{ ...curLoc }}
        anchor={{ x: 0.5, y: 0.6 }}
      />
    );
  }, [curLoc, markerRef]);

  const updateState = (data: IStateProps) => setState((state) => ({ ...state, ...data }));

  const fetchDestinationCords = (lat: number, lng: number) => {
    updateState({
      ...state,
      curLoc: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  return (
    <Container>
      <TopNavigation
        title={t('address:add_new_address').toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Content contentContainerStyle={{ paddingBottom: bottomButton }}>
        <Text marginLeft={16} marginBottom={16} marginTop={24} category="h6">
          {t('common:shipping_detail')}
        </Text>
        <Input
          style={styles.input}
          placeholder={t('common:username').toString()}
          accessoryLeft={<Icon pack="assets" name="user" />}
        />
        <Input
          style={styles.input}
          placeholder={t('common:phone_number').toString()}
          accessoryLeft={<Icon pack="assets" name="phone" />}
        />
        <Input
          style={styles.input}
          placeholder={t('common:address').toString()}
          accessoryLeft={<Icon pack="assets" name="location" />}
        />
        <Text category="h6" marginTop={4} marginLeft={16}>
          {t('address:select_address_on_the_map')}
        </Text>
        <MapView
          followsUserLocation={true}
          ref={refMap}
          moveOnMarkerPress={true}
          provider={'google'}
          customMapStyle={CustomMapStyle}
          showsScale
          initialRegion={{
            ...state.curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          zoomEnabled
          loadingEnabled={true}
          loadingIndicatorColor={theme['color-primary-500']}
          zoomTapEnabled
          style={styles.mapView}
          onPress={(e) => {
            updateState({
              heading: heading,
              curLoc: e.nativeEvent.coordinate,
              coordinate: new AnimatedRegion({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }),
              isLoading: false,
              time: 0,
              distance: 0,
            });
          }}>
          {renderMarker()}
        </MapView>
        <View style={styles.row}>
          <Text category="h6">{t('address:status_location')}</Text>
          <Toggle checked={checked} onChange={toggle} />
        </View>
      </Content>
      <Layout style={[styles.bottomView, { paddingBottom: bottom + 16 }]}>
        <Button children={t('common:submit').toString()} onPress={goBack} />
      </Layout>
    </Container>
  );
});

export default AddAddress;

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    marginHorizontal: 16,
  },
  mapView: {
    marginTop: 12,
    width: '100%',
    height: 210,
  },
  row: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  bottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    paddingTop: 8,
  },
});
