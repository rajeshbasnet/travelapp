import React from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Animatable from "react-native-animatable";

import { HeroImage } from "../assets";

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView className="bg-white flex-1 relative">
            {/* First Section */}
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
                    <Text className="text-[#4DABB7] text-3xl font-semibold">Go</Text>
                </View>
                <Text className="text-[#2A2B4B] text-3xl font-semibold">Travel</Text>
            </View>

            {/* Second Section */}
            <View className="px-6 mt-8 space-y-3">
                <Text className="text-[#3C6072] text-[42px]">Enjoy the trip with</Text>
                <Text className="text-[#4DABB7] text-[38px] font-bold">Good moments</Text>
                <Text>Ullamco duis id ut incididunt reprehenderit irure eiusmod in culpa elit in excepteur voluptate.</Text>
            </View>

            {/* Circle Section */}
            <View className="w-[380px] h-[380px] bg-[#4DABB7] rounded-full absolute bottom-36 -right-36"></View>
            <View className="w-[380px] h-[380px] bg-[#E99265] rounded-full absolute -bottom-28 -left-36"></View>

            {/* Image Container */}
            <View className="flex-1 relative items-center justify-center">
                <Animatable.Image
                    animation={"bounceIn"}
                    easing="ease-in-out"
                    source={HeroImage}
                    className="w-full h-full mt-20"
                    style={{ resizeMode: "contain" }}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate("Discover")}
                    className="absolute bottom-10 w-24 h-24 border-l-2 border-r-2 border-t-4 border-[#4DABB7] items-center justify-center"
                    style={{ borderRadius: 50 }}
                >
                    <Animatable.View
                        animation={"pulse"}
                        easing="ease-in-out"
                        iterationCount={"infinite"}
                        className="w-20 h-20 items-center justify-center rounded-full bg-[#4DABB7]"
                    >
                        <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
                    </Animatable.View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
