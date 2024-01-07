import { ActivityIndicator, Alert, FlatList, Keyboard, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Autocomplete, AutocompleteItem, Icon, Input } from '@ui-kitten/components'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import { useAppDispatch } from 'store/store';
import { searchByAutocomplete, searchProduct } from 'store/slices/productSlice';
import { NavigationProp, useNavigation, useTheme } from '@react-navigation/native';
import { RootStackParamList } from 'navigation/types';
import Text from './Text';
import { useRoute } from '@react-navigation/native';
let page = 1;
let timer: any;
export default function Search({ show, setShow, search, setSearch, textInputRef }) {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const bottomSheetPhotoRef = React.useRef<BottomSheet>(null);
    const { navigate, setParams } = useNavigation<NavigationProp<RootStackParamList>>();
    const [isTyping, setisTyping] = React.useState('');
    const [fetchProducts, setfetchProducts] = React.useState([])
    const [productsName, setproductsName] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const fetching = async (search?: string) => {
        const json = await dispatch(searchByAutocomplete(search ?? ""));
        setproductsName(json?.data)
        setfetchProducts(json?.data)
        await setLoading(false)
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
                // setTimeout(() => {
                // setShow(false);
                // }, 100);
            }
        );

        // Clean up the listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
            // setShow(false);
            setSearch("")
        };
    }, []);

    const applyFilter = (s: string) => {
        page = 1;
        clearTimeout(timer);
        timer = setTimeout(async () => {
            if (s != "") {
                fetching(s)
                // setLoading(true);
                // const filtered = productsName?.filter((names: string) => names?.toLowerCase().includes(s?.toLowerCase()));
                // console.log("filtered", filtered)
                // setfetchProducts(filtered)
                // setLoading(false);
            }
            else {
                setfetchProducts(productsName)
            }
        }, 100);
    }

    const { name: routeName } = useRoute()

    const productSearch = React.useCallback((query: string): void => {
            setLoading(true)
        setSearch(query);
        applyFilter(query);
    }, []);

    const renderAutoComplete = React.useCallback(
        ({ item }: { item: string }) => {
            return (
                <Text category='c2' style={{ paddingVertical: 7, }} onPress={
                    async () => {
                        if (routeName == "ProductGrid") {
                            setParams({ search: item })
                        }
                        else navigate("Product", {
                            screen: "ProductGrid", params: { search: item }
                        })
                        setShow(false)
                    }
                }  >
                    {item}
                </Text>
            )
        }, [])

    const searchCall = async () => {
        navigate("Product", {
            screen: "ProductGrid",
            params: { inputFocus: true, search }
        })
        // const json = await dispatch(searchByAutocomplete(page, {
        //     search
        // }, true));
    }
    const renderOption = ({ item, index }): React.ReactElement => (
        <AutocompleteItem
            style={{ width: 300, borderRadius: 0 }}
            key={index}
            title={item}
        />
    );

    return (
        <View style={styles.search}>
            <Input
                status="search"
                value={search}
                ref={textInputRef}
                onChangeText={productSearch}
                placeholder={'Search... '}
                accessoryRight={(props) => (
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        {loading && <Text
                            activeOpacity={0.7}
                            style={[styles.filter, { borderColor: theme['color-basic-500'], marginRight: 10 }]}
                        >
                            <ActivityIndicator color={"#BAB8B7"} size={"small"} />
                        </Text>}
                        <Text
                            activeOpacity={0.7}
                            style={[styles.filter, { borderColor: theme['background-basic-color-5'] }]}
                            onPress={searchCall}>
                            <Icon {...props} pack="assets" name="search" />
                        </Text>
                    </View>
                )}
            />

            {show && <FlatList
                data={fetchProducts || []}
                renderItem={renderAutoComplete}
                keyExtractor={(item) => `${item}`}
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
                    maxHeight: 200,
                    borderBottomLeftRadius:5,
                    borderBottomRightRadius:5
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