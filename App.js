import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const App = () => {

  const animatedValue = useSharedValue(100);  // can pass number, string, boolean, array, objects..
  const width = useSharedValue(100);
  const height = useSharedValue(100);
  const radius = useSharedValue(0);

  //create custom animated component
  const AnimatedImage = Animated.createAnimatedComponent(Image);
  const AnimatedCrossBtn = Animated.createAnimatedComponent(TouchableOpacity);

  const animatedBtnScale = useSharedValue(0);

  const animatedImgWidth = useSharedValue(80);
  const animatedImgHeight = useSharedValue(80);
  const animatedImgY = useSharedValue(0);

  const animatedImgStyle = useAnimatedStyle(() => {
    return {
      width: animatedImgWidth?.value,
      height: animatedImgHeight?.value,
      transform: [{translateY: animatedImgY?.value}]
    }
  })

  const animatedBtnStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: animatedBtnScale?.value}]
    }
  })

  const animatedStyle = useAnimatedStyle(() => {
    return{
      width: width?.value,
      height: height?.value,
      borderRadius: radius?.value,
      // transform: [{ translateX: width.value }, { translateY: height.value }]
    }
  })

  //function to animate the square to circle
  const animateSquareToCircle = () => {
    if(width.value === 100){
        width.value  = withDelay(2000, withSpring(200));
        height.value = withDelay(2000, withSpring(200));
        radius.value = withDelay(2000, withSpring(100));
    } else {
        width.value  = withDelay(2000, withSpring(100));
        height.value = withDelay(2000, withSpring(100));
        radius.value = withDelay(2000, withSpring(0));
    }
  }

  //function to animate the image
  const animateTheImage = () => {
    animatedImgWidth.value = withSpring(300);
    animatedImgHeight.value = withSpring(300);
    animatedImgY.value = withSpring(200);
    animatedBtnScale.value = withTiming(1, {duration: 200});
  }

  //function to animate the cross button
  const onClickCrossBtn = () => {
    animatedBtnScale.value = 0;
    animatedImgWidth.value = withSpring(80);
    animatedImgHeight.value = withSpring(80);
    animatedImgY.value = withTiming(0, {duration: 200});
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <AnimatedCrossBtn style={[{margin: 20, width: 30, height: 30, alignItems:"center", justifyContent:"center"}, animatedBtnStyle]} onPress={() => onClickCrossBtn()}>
        <Image source={require('./src/assets/images/cross.png')} style={{width: 20, height: 20}} />
      </AnimatedCrossBtn>
      <TouchableOpacity activeOpacity={1} style={{alignItems:"center", justifyContent:'center'}} onPress={() => animateTheImage()}>
        <AnimatedImage source={require('./src/assets/images/defaultAvatar.png')} style={[styles.image, animatedImgStyle]} resizeMode={'contain'} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  image: {
    width: 80, 
    height: 80, 
    margin: 20
  },
})

export default App;