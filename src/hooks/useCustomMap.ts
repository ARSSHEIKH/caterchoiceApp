import useLayout from './useLayout';

const useCustomMap = () => {
  const { width, height } = useLayout();

  const ASPECT_RATIO = width / height;
  const LATITUDE = 40.70319733435508;
  const LONGITUDE = -74.01289332658052;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const initialRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const CustomMapStyle = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'landscape.natural.landcover',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#dbdbdb',
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.government',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#dbdbdb',
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'poi.medical',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#dbdbdb',
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'poi.school',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#dbdbdb',
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        {
          color: '#1f1f1f',
        },
        {
          weight: 0.3,
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        {
          color: '#1f1f1f',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'transit.station.airport',
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#787878',
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'transit.station.airport',
      elementType: 'labels.text',
      stylers: [
        {
          color: '#787878',
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#171717',
        },
        {
          saturation: -45,
        },
        {
          lightness: -65,
        },
        {
          weight: 0.5,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
        {
          saturation: -45,
        },
        {
          lightness: -65,
        },
        {
          visibility: 'on',
        },
        {
          weight: 1,
        },
      ],
    },
  ];
  return {
    ASPECT_RATIO,
    LATITUDE,
    LONGITUDE,
    LATITUDE_DELTA,
    LONGITUDE_DELTA,
    initialRegion,
    CustomMapStyle,
  };
};

export default useCustomMap;
