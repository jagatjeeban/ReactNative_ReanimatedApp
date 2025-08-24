import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

//constants
const { width } = Dimensions.get('window');
const slideWidth = width * 0.75;
const slideHeight = slideWidth * 1.76;
const spacing = 18;

const getImageUrl = (id) => `https://picsum.photos/300/300?random=${id}`;

const dummyImgs = [
    { id: 1, image: getImageUrl(1) },
    { id: 2, image: getImageUrl(2) },
    { id: 3, image: getImageUrl(3) },
    { id: 4, image: getImageUrl(4) },
    { id: 5, image: getImageUrl(5) },
]

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const BackdropImage = ({ photo, index, scrollX }) => {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollX.value,
                [index - 1, index, index + 1],
                [0, 1, 0]
            )
        }
    })

    return (
        <AnimatedFastImage
            source={{ uri: photo.image }}
            style={[StyleSheet.absoluteFillObject, animatedStyle]}
        />
    )
}

const Slide = ({ photo, index, scrollX }) => {

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: interpolate(
                        scrollX.value,
                        [index - 1, index, index + 1],
                        [1.4, 1, 1.4],
                        Extrapolation.CLAMP
                    )
                },
                {
                    rotate: `${interpolate(
                        scrollX.value,
                        [index - 1, index, index + 1],
                        [15, 0, -15],
                        Extrapolation.CLAMP
                    )}deg`
                }
            ]
        }
    })

    return (
        <View style={styles.shadow}>
            <View style={{
                width: slideWidth,
                height: slideHeight,
                overflow: 'hidden',
                borderRadius: 12,
                backgroundColor: 'grey'
            }}>
                <AnimatedFastImage
                    source={{ uri: photo.image }}
                    style={[{ flex: 1 }, animatedStyle]}
                />
            </View>
        </View>
    )
}

const WallpaperCarousel = () => {

    //shared value
    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler((e) => {
        scrollX.value = e.contentOffset.x / (slideWidth + spacing) //get the exact index
    })

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
            <View style={StyleSheet.absoluteFillObject}>
                {dummyImgs.map((photo, index) => (
                    <BackdropImage
                        key={`bg-photo-${photo.id}`}
                        photo={photo}
                        index={index}
                        scrollX={scrollX}
                    />
                ))}
            </View>
            <Animated.FlatList
                data={dummyImgs}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <Slide
                            photo={item}
                            index={index}
                            scrollX={scrollX}
                        />
                    )
                }}
                snapToInterval={slideWidth + spacing}
                decelerationRate={'fast'}
                onScroll={onScroll}
                scrollEventThrottle={1000 / 60}
                contentContainerStyle={{
                    gap: spacing,
                    paddingHorizontal: (width - slideWidth) / 2,
                    alignItems: 'center'
                }}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    )
}

export default WallpaperCarousel

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 20
    }
})