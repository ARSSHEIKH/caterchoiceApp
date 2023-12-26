import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import FastImage from 'react-native-fast-image'
import { fetchPromotions, productSelector } from 'store/slices/productSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { ICollection } from 'constants/types';
import { CollectionItem } from 'components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/types';
export default function PromotionBanner() {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.iconView} onPress={() => navigate('Product', { screen: 'ProductGrid', params:{
            isPromotion: true
        } })}>
            <FastImage style={styles.image} source={{ uri: "https://cater-choice-assets.s3.eu-west-2.amazonaws.com/storage/banners/Manhattan_Web_Banner.jpeg" }}>
                <View style={styles.content}>

                    {/* <Text category="h4" marginTop={16}>
        {title}
      </Text> */}
                    {/* {description && <Text status="content">{description}</Text>} */}
                    {/* {button && <Button {...button} />} */}
                </View>
            </FastImage>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iconView: {
        width: '100%',
        height: 200,
        paddingHorizontal: 20
        // flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10
        // height: '100%',
    },
    content: {
        paddingHorizontal: 16,
    },
})