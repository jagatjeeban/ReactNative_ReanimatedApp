import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const Cart = () => {

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  const [ itemCount, setItemCount ]       = useState(0);
  const [ btnDisable, setBtnDisable ]     = useState(false);

  const animatedX = useSharedValue(0);
  const animatedY = useSharedValue(0);
  const animatedScale = useSharedValue(0);
  const animatedScale2 = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return{
        transform: [{translateX: animatedX.value}, {translateY: animatedY.value}, {scale: animatedScale.value}]
    }
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return{
        transform: [{scale: animatedScale2.value}]
    }
  })

  //function to handle the animations
  const handleAnimation = () => {
    animatedScale.value = 1;
    setBtnDisable(true);
    animatedX.value = withTiming((screenWidth/2)-27, {duration: 800});
    animatedY.value = withTiming(-(screenHeight-200), {duration: 800});
    setTimeout(() => {
        animatedScale.value = 0;
        animatedScale2.value = withSpring(1.5);
        setItemCount(itemCount + 1);
        animatedX.value = withTiming(0, {duration: 800});
        animatedY.value = withTiming(0, {duration: 800});
        setTimeout(() => animatedScale2.value = withSpring(1), 150);
    }, 800);
    setTimeout(() => setBtnDisable(false), 2000);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <Animated.View style={[styles.plusOneContainer, animatedStyle]}>
            <Text style={{color:"white", fontSize: 15}}>+1</Text>
        </Animated.View>
        <View>
            <Image source={require('../assets/images/shoe.jpg')} style={{width: '100%', height: 350}} resizeMode='cover' />
            <View style={styles.cartItemsContainer}>
                <Image source={require('../assets/images/bag.png')} style={{width: 25, height: 25}} />
                {itemCount !== 0? 
                <Animated.View style={[styles.itemCountContainer, animatedStyle2]}>
                    <Text style={{color:"white", fontSize: 15}}>{itemCount}</Text>
                </Animated.View>: null}
            </View>
        </View>
        <Text style={{color:'white', fontSize: 30, margin: 20, fontWeight: 500}}>Stylish Shoe</Text>
        <Text style={{color:'white', fontSize: 20, marginHorizontal: 20}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</Text>
        <TouchableOpacity disabled={btnDisable} onPress={() => handleAnimation()} style={styles.addToCartBtn}>
            <Image source={require('../assets/images/bag.png')} style={{width: 25, height: 25}} />
            <Text style={{color:'black', fontSize: 20, fontWeight: 500, marginLeft: 15}}>Add to Cart</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Cart;

const styles = StyleSheet.create({
    safeAreaView: {
        flex:1,
    },
    plusOneContainer: {
        position:"absolute", 
        bottom: 100, 
        zIndex:5, 
        alignSelf:'center', 
        width: 25, 
        height: 25, 
        backgroundColor:'red', 
        borderRadius:40, 
        alignItems:'center', 
        justifyContent:"center"
    },
    cartItemsContainer: {
        position:"absolute", 
        right: 20, 
        top: 20, 
        width: 40, 
        height: 40, 
        backgroundColor:'white', 
        borderRadius:40, 
        alignItems:'center', 
        justifyContent:"center"
    },
    itemCountContainer: {
        position:"absolute", 
        right: -5, 
        top: -5, 
        paddingVertical: 3, 
        paddingHorizontal: 8, 
        backgroundColor:'red', 
        borderRadius:40, 
        alignItems:'center', 
        justifyContent:"center"
    },
    addToCartBtn: {
        position:"absolute", 
        flexDirection:"row", 
        alignSelf:"center", 
        bottom: 40, 
        alignItems:"center", 
        justifyContent:"center", 
        backgroundColor:"white", 
        padding: 15, 
        width:'90%', 
        borderRadius:12
    },
});