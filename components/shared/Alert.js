import { View, Text } from "react-native";
import React from "react";

export default function Alert({ message }) {
    return (
        <View className="absolute right-2 top-4 bg-red-600 h-11 items-center justify-center border-yellow-400 border-l-4">
            <Text className="px-4 text-gray-50 font-[SansBold]">{message}</Text>
        </View>
    );
}

export function AlertError({ message }) {
    return (
        <View className="absolute z-50 right-2 top-4 bg-red-600 h-11 items-center justify-center border-yellow-400 border-l-4">
            <Text className="px-4 text-gray-50 font-[SansBold]">{message}</Text>
        </View>
    );
}

export function AlertSuccess({ message }) {
    return (
        <View className="absolute z-50 right-2 top-4 bg-[#A2FD7D] h-11 items-center justify-center border-yellow-400 border-l-4">
            <Text className="px-4 font-[SansBold]">{message}</Text>
        </View>
    );
}
