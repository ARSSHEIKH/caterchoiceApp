import * as ImagePicker from 'react-native-image-picker';

type ImagePickerCallBack = (image?: ImagePicker.Asset) => void;

const MAX_SIZE = 1024;

const useImagePicker = () => {
  const takePhoto = async (callback?: ImagePickerCallBack) => {
    let result = await ImagePicker.launchCamera({
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: MAX_SIZE,
      maxHeight: MAX_SIZE,
      quality: 0.8,
    });

    if (result.didCancel) {
      callback && callback();
    } else {
      if (result.assets && result.assets[0]) {
        callback && callback(result.assets[0]);
      }
    }
  };

  const choosePhoto = async (callback?: ImagePickerCallBack) => {
    let result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      maxWidth: MAX_SIZE,
      maxHeight: MAX_SIZE,
      quality: 0.8,
    });

    if (result.didCancel) {
      callback && callback();
    } else {
      if (result.assets && result.assets[0]) {
        callback &&
          callback({
            ...result.assets[0],
            base64: `data:image/png;base64,${result.assets[0].base64}`,
          });
      }
    }
  };
  return { takePhoto, choosePhoto };
};

export default useImagePicker;
