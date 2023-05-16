import { View, Text } from "react-native";
import React from "react";

export default function Amenities({ amenitiesScreen }) {
    console.log(amenitiesScreen);
    return (
        <View className="mt-3">
            <Text className="font-[BalooBold] text-xl text-gray-600">
                Amenities
            </Text>
            <View>
                {amenitiesScreen &&
                    amenitiesScreen.map((item, index) => {
                        return (
                            <Text
                                key={index}
                                className="text-[12px] leading-5 text-gray-500 text-justify"
                            >
                                {item}
                            </Text>
                        );
                    })}
            </View>
        </View>
    );
}
