import { SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const ProfileImage = () => {

    //create custom animated component
    const AnimatedImage = Animated.createAnimatedComponent(Image);
    const AnimatedCrossBtn = Animated.createAnimatedComponent(TouchableOpacity);

    //shared values
    const animatedBtnScale = useSharedValue(0);
    const animatedImgWidth = useSharedValue(80);
    const animatedImgHeight = useSharedValue(80);
    const animatedImgY = useSharedValue(0);

    const animatedImgStyle = useAnimatedStyle(() => {
        return {
            width: animatedImgWidth?.value,
            height: animatedImgHeight?.value,
            transform: [{ translateY: animatedImgY?.value }]
        }
    })

    const animatedBtnStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: animatedBtnScale?.value }]
        }
    })

    //function to animate the image
    const animateTheImage = () => {
        animatedImgWidth.value = withSpring(300, { damping: 80, stiffness: 200 });
        animatedImgHeight.value = withSpring(300, { damping: 80, stiffness: 200 });
        animatedImgY.value = withSpring(200, { damping: 80, stiffness: 200 });
        animatedBtnScale.value = withTiming(1, { duration: 200 });
    }

    //function to animate the cross button
    const onClickCrossBtn = () => {
        animatedBtnScale.value = 0;
        animatedImgWidth.value = withSpring(80, { damping: 80, stiffness: 200 });
        animatedImgHeight.value = withSpring(80, { damping: 80, stiffness: 200 });
        animatedImgY.value = withTiming(0, { duration: 200 });
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <AnimatedCrossBtn style={[{ margin: 20, width: 30, height: 30, alignItems: "center", justifyContent: "center" }, animatedBtnStyle]} onPress={() => onClickCrossBtn()}>
                <Image source={require('../assets/images/cross.png')} style={{ width: 20, height: 20 }} />
            </AnimatedCrossBtn>
            <TouchableOpacity activeOpacity={1} style={{ alignItems: "center", justifyContent: 'center' }} onPress={() => animateTheImage()}>
                <AnimatedImage source={require('../assets/images/defaultAvatar.png')} style={[styles.image, animatedImgStyle]} resizeMode={'contain'} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfileImage;

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