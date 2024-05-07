import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const App = () => {

  const animatedValue = useSharedValue(100);  // can pass number, string, boolean, array, objects..
  const width = useSharedValue(100);
  const height = useSharedValue(100);
  const radius = useSharedValue(0);

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Animated.View style={[{width: 100, height: 100, backgroundColor:'red'}, animatedStyle]}>
      </Animated.View>
      <TouchableOpacity 
        onPress={() => animateSquareToCircle()} 
        style={{height: 50, marginHorizontal:30, marginTop:"50%", alignItems:'center', justifyContent:"center", backgroundColor:'white'}}
      >
        <Text style={{fontSize: 20}}>Animate</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  }
})

export default App;