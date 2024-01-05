import { ActivityIndicator, SafeAreaView, StyleSheet, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { CommonActions, NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native'
import { openLink } from 'utils/openLink'
import { paymentUrl, uri } from 'constants/common'
import Api from 'services/api'
import { useAppSelector } from 'store/store'
import { userSelector } from 'store/slices/userSlice'
import axios from 'axios'
import { SCREEN_HEIGHT } from '@gorhom/bottom-sheet'
import { RootStackParamList } from 'navigation/types'
import { Text } from 'components'
import { Button } from '@ui-kitten/components'
import { Layout } from 'react-native-reanimated'


const orderStatus = async (order_id, token) => {
    try {
        const response = await axios.get(uri + "/order_status/" + order_id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
};


export default function OrderCompleted({ route }) {
    const { orderId } = route.params;
    const { user } = useAppSelector(userSelector)
    const { navigate, dispatch: nDispatch } = useNavigation<NavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(true)
    const openInApp = async () => {
        setLoading(true)
        const url = `${paymentUrl}/${orderId}`;
        const response = await openLink(url);
        if (response?.type == "cancel") {
            const orderStatusResponse = await orderStatus(orderId, user?.access_token)
            if (orderStatusResponse?.data?.data?.payment_status?.includes("complete"))
                navigate('ModalScreen', {
                    modalScreen: {
                        status: 'success',
                        title: 'Success!',
                        description: 'Thank you for purchasing\nYour order will be shipped in few day',
                        children: [
                            {
                                status: 'primary',
                                title: 'Go Shopping',
                                onPress: () => {
                                    nDispatch(
                                        CommonActions.reset({
                                            index: 1,
                                            routes: [
                                                { name: 'Drawer', },
                                            ],
                                        })
                                    );
                                },
                                id: 0,
                            },
                        ],
                    },
                })
            else setLoading(false)
        }
        else {
            setLoading(false)
        }
    }
    useFocusEffect(
        useCallback(() => {
            if (orderId) {
                openInApp()
            }
            else {
                setLoading(false)
            }
            return () => {
            }
        }, [orderId])
    )
    const PendingState = () => {
        return (
            <>
                <Text category='h3'>Order is in Pending</Text>
                <Button
                    style={{ marginTop: 10, borderRadius: 12, paddingHorizontal: 5, paddingVertical: 1, minHeight: 38,  }}
                    children={<Text category='b3'>Pay Now</Text>}
                    onPress={openInApp}
                />
            </>
        )
    }
    return (
        <SafeAreaView style={styles.container} >
            {loading ? <ActivityIndicator size={"large"} color={"#000"} />
                :
                <PendingState />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: SCREEN_HEIGHT,
        alignItems: "center",
        justifyContent: "center"
    }
})