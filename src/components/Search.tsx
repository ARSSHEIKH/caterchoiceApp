import { FlatList, Keyboard, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon, Input } from '@ui-kitten/components'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useAppDispatch } from 'store/store';
import { searchByAutocomplete, searchProduct } from 'store/slices/productSlice';
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/types';
import Text from './Text';
let page = 1;
let timer: any;
export default function Search({ show, setShow, search, setSearch }) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const bottomSheetPhotoRef = React.useRef<BottomSheet>(null);
    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
    const [isTyping, setisTyping] = React.useState('');
    const [fetchProducts, setfetchProducts] = React.useState([])
    const [productsName, setproductsName] = React.useState([])

    const fetching = async () => {
        const json = await dispatch(searchByAutocomplete(page, true));
        setproductsName(json?.data)
        setfetchProducts(json?.data)
    }


    React.useEffect(() => {
        fetching()
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setShow(true)
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                // setShow(false);
            }
        );

        // Clean up the listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    const applyFilter = (s: string) => {
        page = 1;
        clearTimeout(timer);
        timer = setTimeout(async () => {
            // setLoading(true);
            const filtered = productsName?.filter((names: string) => names?.toLowerCase().includes(s?.toLowerCase()));
            setfetchProducts(filtered)
            // setLoading(false);
        }, 100);
    }

    const productSearch = (s: string) => {
        setSearch(s);
        applyFilter(s);
    }

    // console.log("autoCompleteProducts", fetchProducts);


    const renderAutoComplete = React.useCallback(
        ({ item }) => {

            return (
                <Pressable style={{ paddingVertical: 5 }} onPress={
                    async () => {

                        const product = await dispatch(searchProduct(item))

                        if (product?.status == 200)
                            navigate("Product", {
                                screen: "ProductGrid", params: { search: true }
                            })
                    }
                }  >
                    <Text category='c2' >{item}</Text>
                </Pressable>
            )
        }, [search])

    const searchCall = async () => {
        navigate("Product", {
            screen: "ProductGrid",
            params: { inputFocus: true, search }
        })
        // const json = await dispatch(searchByAutocomplete(page, {
        //     search
        // }, true));
    }

    return (
        <View style={styles.search}>
            <Input
                status="search"
                value={search}
                onChangeText={productSearch}
                placeholder={'Search... '}
                accessoryRight={(props) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.filter, { borderColor: theme['background-basic-color-5'] }]}
                        onPress={searchCall}>
                        <Icon {...props} pack="assets" name="search" />
                    </TouchableOpacity>
                )}
            />
            {show && <FlatList
                data={fetchProducts || []}
                renderItem={renderAutoComplete}
                keyExtractor={(item) => `${item.id}`}
                style={{
                    borderWidth: 0.5,
                    borderTopWidth: 0,
                    padding: 10,
                    position: "absolute",
                    top: 45,
                    width: "100%",
                    zIndex: 899999,
                    backgroundColor: "#fff",
                    minHeight: "auto",
                    maxHeight: 150
                }}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={true}
            />}
        </View>
    )
}

const styles = StyleSheet.create({

    search: {
        marginTop: 16,
        marginHorizontal: 16,
        marginBottom: 24,
    },
    filter: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 12,
        borderLeftWidth: 1,
    },
})