import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Images } from 'assets/images'
import { useLayout } from 'hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';

export default function SplashScreen({ setSplashShow }) {
  const { width, top, bottom, height } = useLayout();
  

  // useEffect(() => {
  //   async function getUser() {
  //     AsyncStorage.getItem('user').then((localUser) => {
  //     dispatch(setUser(JSON.parse(localUser)))
  //       setSplashShow(false)
  //     }).catch(() => {
  //       dispatch(setUser({}))
  //       setSplashShow(false)
  //     })
  //   }
  //   getUser()
  // }, [])
  return (
    <View style={{ flex: 1, height, justifyContent: "center", alignItems: "center", backgroundColor:"#fff" }} >
      <View style={{ width: "80%" }} >
        <View style={{ height: "95%", justifyContent: "center" }}>
          <Image resizeMode='contain' style={[styles.icon40]} source={Images.logo} />
        </View>
        {/* <View style={{ position: "absolute", bottom: 0, width: "100%", }} >
          <TouchableOpacity style={{ backgroundColor: "#C56017", width: "100%", paddingVertical: 15, borderRadius: 10, }}>
            <Text style={styles.buttonText} >
              Loslegen
            </Text>
          </TouchableOpacity>
        </View> */}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  icon40: {
    width: "100%",
    // height: 50,
  },
  buttonText: {
    color: "#FFF", textAlign: "center", fontWeight: '600'
  }
})