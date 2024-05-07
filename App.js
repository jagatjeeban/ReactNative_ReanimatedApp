import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Animated, { useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const App = () => {

  const animatedValue = useSharedValue(100);  // can pass number, string, boolean, array, objects..

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Animated.View style={{width: animatedValue, height: animatedValue, backgroundColor:'red'}}>
      </Animated.View>
      <TouchableOpacity 
        onPress={() => {
          animatedValue.value = withSpring(animatedValue.value + 50)
        }} 
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