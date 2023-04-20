import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import LogoImage from "../assets/lottie/travel.gif";

export default function Splash({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="h-[50%] items-center">
                <Image
                    source={LogoImage}
                    className="w-80 h-full"
                    resizeMode="contain"
                />
            </View>

            <View className="flex-1 justify-between items-center mx-8 my-16">
                <View>
                    <Text className="font-[BalooBold] text-5xl text-center leading-[60px]">
                        Go Travel
                    </Text>
                    <Text className="text-[16px] font-[SansMedium] text-center tracking-tighter">
                        A platform built for a new way of travelling
                    </Text>
                </View>
                {/** Get Started */}
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
                    <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4 w-[250px] relative">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
                            Get Started
                        </Text>
                        <View className="absolute right-2 top-[70%]">
                            <Entypo
                                name="chevron-right"
                                size={22}
                                color="black"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
