import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, Icon, Input } from '@ui-kitten/components';
import { useTranslation } from 'react-i18next';

import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  Styles,
} from 'react-native-google-places-autocomplete';

interface IAutoCompleteLocationProps {
  style?: Partial<Styles>;
  fetchAddress: (lat: number, lng: number, zipCode: string, cityText: string) => void;
}

const AutoCompleteLocation = ({ style, fetchAddress }: IAutoCompleteLocationProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const onPressAddress = (data: GooglePlaceData, details: GooglePlaceDetail) => {
    const resLength = details.address_components.length;
    let zipCode = '';

    let filtersResCity = details.address_components.filter((val) => {
      if (val.types.includes('locality') || val.types.includes('sublocality')) {
        return val;
      }
      if (val.types.includes('postal_code')) {
        let postalCode = val.long_name;
        zipCode = postalCode;
      }
      return false;
    });

    let dataTextCityObj =
      filtersResCity.length > 0
        ? filtersResCity[0]
        : details.address_components[resLength > 1 ? resLength - 2 : resLength - 1];

    let cityText =
      dataTextCityObj.long_name && dataTextCityObj.long_name.length > 17
        ? dataTextCityObj.short_name
        : dataTextCityObj.long_name;

    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    fetchAddress(lat, lng, zipCode, cityText);
  };
  return (
    <GooglePlacesAutocomplete
      placeholder={t('address')}
      //@ts-ignore
      onPress={onPressAddress}
      fetchDetails={true}
      query={{
        key: 'AIzaSyDCDlsNM6Um1u-yJeIRQIwozhsYuGMmB8s',
        language: 'en',
      }}
      styles={{
        textInputContainer: styles.containerStyle,
        textInput: styles.textInputStyle,
        poweredContainer: styles.poweredContainer,
        row: {},
        listView: styles.listView,
        ...style,
      }}
      textInputProps={{
        InputComp: Input,
        accessoryLeft: <Icon pack="assets" name="search" />,
      }}
    />
  );
};

export default AutoCompleteLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  textInputStyle: {},
  poweredContainer: {
    position: 'absolute',
    zIndex: -10000,
  },
  listView: {
    marginHorizontal: 34,
    borderRadius: 6,
    borderWidth: 1,
    //borderColor: 'color-border-input-focus',
    marginTop: 12,
  },
});
