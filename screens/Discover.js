import React from "react";

import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AvatarImage } from "../assets";

export default function Discover() {
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            {/* First Section */}
            <View className="flex-row items-center justify-between px-8">
                <View>
                    <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
                    <Text className="text-[#527283] text-[36px]">the beauty today</Text>
                </View>
                <View className="w-12 h-12 rounded-md items-center justify-center">
                    <Image source={AvatarImage} className="w-full h-full rounded-md" />
                </View>
            </View>
        </SafeAreaView>
    );
}
