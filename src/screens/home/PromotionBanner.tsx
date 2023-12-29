import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import FastImage from 'react-native-fast-image'
import { fetchPromotions, productSelector } from 'store/slices/productSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { ICollection } from 'constants/types';
import { CollectionItem, TitleBar } from 'components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/types';
import { useTranslation } from 'react-i18next';
export default function PromotionBanner() {
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
    const { t } = useTranslation(['common', 'home']);
    return (
        <>
            <TitleBar
        marginTop={32}
        marginBottom={16}
                paddingHorizontal={16}
                title={t('Promotions')}
                textStyle={{ color: "#ce1212" }}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.iconView} onPress={() => navigate('Product', {
                screen: 'ProductGrid', params: {
                    isPromotion: true
                }
            })}>
                <FastImage style={styles.image} source={require("../../assets/images/promotion-banner.jpeg")}>
                    <View style={styles.content}>

                        {/* <Text category="h4" marginTop={16}>
        {title}
      </Text> */}
                        {/* {description && <Text status="content">{description}</Text>} */}
                        {/* {button && <Button {...button} />} */}
                    </View>
                </FastImage>
            </TouchableOpacity>
        </>
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