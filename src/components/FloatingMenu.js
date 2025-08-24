import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const FloatingMenu = () => {

    //for the menu
    const width = useSharedValue(0);
    const valueY = useSharedValue(0);

    //for the menu icons
    const scaleIcon = useSharedValue(0);

    //for the btn text
    const openedScale = useSharedValue(1);
    const closedScale = useSharedValue(0);

    //animated style for the menu
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: width.value,
            transform: [{ translateY: valueY.value }]
        }
    });

    //animated style for the menu icons
    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scaleIcon.value }]
        }
    });

    const openTextAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: openedScale.value }]
        }
    })

    const closeTextAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: closedScale.value }]
        }
    })

    //function to handle the animated values
    const handleOnClickEvent = () => {
        if (width.value === 0) {
            width.value = withTiming(350, { duration: 300 });
            valueY.value = withTiming(-50, { duration: 300 });
            scaleIcon.value = withTiming(1, { duration: 500 });
            openedScale.value = withTiming(1, { duration: 300 });
            closedScale.value = withTiming(0, { duration: 300 });
        } else {
            width.value = withTiming(0, { duration: 300 });
            valueY.value = withTiming(50, { duration: 300 });
            scaleIcon.value = withTiming(0, { duration: 300 });
            openedScale.value = withTiming(0, { duration: 300 });
            closedScale.value = withTiming(1, { duration: 300 });
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Animated.View style={[animatedStyle, { backgroundColor: "black", borderRadius: 40, flexDirection: 'row', justifyContent: "space-evenly", alignItems: 'center', width: 350, height: 80 }]}>
                    <Animated.Text style={[iconAnimatedStyle, { color: 'white', fontSize: 40, paddingHorizontal: 20 }]}>B</Animated.Text>
                    <Animated.Text style={[iconAnimatedStyle, { color: 'white', fontSize: 40, paddingHorizontal: 20 }]}>C</Animated.Text>
                    <Animated.Text style={[iconAnimatedStyle, { color: 'white', fontSize: 40, paddingHorizontal: 20 }]}>D</Animated.Text>
                    <Animated.Text style={[iconAnimatedStyle, { color: 'white', fontSize: 40, paddingHorizontal: 20 }]}>E</Animated.Text>
                </Animated.View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleOnClickEvent()} style={{ backgroundColor: 'black', width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: 'center' }}>
                    <Animated.Text style={[closeTextAnimatedStyle, { color: 'white', fontSize: 30 }]}>O</Animated.Text>
                    <Animated.Text style={[openTextAnimatedStyle, { color: 'white', fontSize: 30, position:'absolute' }]}>X</Animated.Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default FloatingMenu