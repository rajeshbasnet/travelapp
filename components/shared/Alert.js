import { View, Text } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";

export default function Alert({ message }) {
    return (
        <View className="absolute right-2 top-4 bg-red-600 h-11 items-center justify-center border-yellow-400 border-l-4">
            <Text className="px-4 text-gray-50 font-[SansBold]">{message}</Text>
        </View>
    );
}

export function AlertError({ message }) {
    return (
        <Animatable.View
            animation={"bounceInUp"}
            easing={"ease-in-out"}
            duration={500}
            direction="alternate"
            className="absolute z-50 right-2 top-4 bg-red-600 h-11 items-center justify-center border-yellow-400 border-l-4"
        >
            <Text className="px-4 text-gray-50 font-[SansBold]">{message}</Text>
        </Animatable.View>
    );
}

export function AlertSuccess({ message }) {
    return (
        <Animatable.View
            animation={"bounceInUp"}
            easing={"ease-in-out"}
            duration={500}
            direction="alternate"
            className="absolute z-50 right-2 top-4 bg-[#A2FD7D] h-11 items-center justify-center border-yellow-400 border-l-4"
        >
            <Text className="px-4 font-[SansBold]">{message}</Text>
        </Animatable.View>
    );
}
