import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'

//import components
import { WallpaperCarousel, FloatingMenu } from './src/components'
import ProfileImage from './src/screens/ProfileImage'
import Cart from './src/screens/Cart'

const App = () => {
  return (
    <View style={styles.safeAreaView}>
      <WallpaperCarousel />
      {/* <ProfileImage /> */}
      {/* <Cart /> */}
      {/* <FloatingMenu /> */}
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  }
})