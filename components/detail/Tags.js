import { View, Text } from "react-native";
import React from "react";

export default function Tags({ tags }) {
    return (
        <View className="flex-row items-center flex-wrap mb-4">
            {tags &&
                tags.map((tag, index) => {
                    return (
                        <Text
                            key={index}
                            className="text-[12px] leading-5 text-gray-50 bg-amber-700 px-2 mr-1 rounded-lg font-[SansMedium] my-1"
                        >
                            {tag}
                        </Text>
                    );
                })}
        </View>
    );
}
