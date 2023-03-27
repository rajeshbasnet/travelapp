import { View, Text, Image, TouchableWithoutFeedback, ImageBackground, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Attraction } from "../assets/images";

export default function Detail({ navigation }) {
    return (
        <SafeAreaView className="flex-1">
            <View className="relative">
                <View className="relative h-[260px]">
                    <ImageBackground source={Attraction} resizeMode="cover" className="w-full h-full" />
                    <View className="absolute w-full h-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}></View>
                </View>
                <View className="mx-2 mt-2 absolute">
                    <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                        <View className="px-2 py-2 rounded-full">
                            <Ionicons name="ios-arrow-undo-circle-outline" size={28} color="white" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View className="absolute bottom-[10%] mx-8">
                    <Text className="font-[BalooBold] text-3xl text-white">Parangtritis</Text>
                    <Text className="font-[BalooBold] text-3xl text-white">Beach</Text>
                    <View className="flex-row items-center justify-between w-[90%]">
                        <Text className="text-white font-[BalooBold] text-md">Yogyakarta</Text>
                        <Text className="text-white font-[BalooBold] text-md">$650/Package</Text>
                        <View className="flex-row items-baseline">
                            <AntDesign name="star" size={15} color="#F5D04A" />
                            <Text className="text-white font-[BalooBold] text-md ml-2">4.5</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="bg-[#F4F5FF] rounded-3xl bottom-4 h-full">
                <View className="mt-8 mx-4">
                    <Text className="font-[BalooBold] text-xl text-gray-600">About</Text>
                    <Text className="font-[BalooMedium] leading-5 text-gray-400 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley of type and ...{" "}
                        <TouchableWithoutFeedback>
                            <Text className="text-[#2DAFBC]">Read More</Text>
                        </TouchableWithoutFeedback>
                    </Text>
                    <View className="my-4">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {[1, 2, 3, 4, 5].map(() => {
                                return (
                                    <View className="mx-2 rounded-3xl">
                                        <Image source={Attraction} className="w-[90px] h-[90px] rounded-xl" resizeMode="contain" />
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                    <View className="mt-2">
                        <Text className="font-[BalooBold] text-xl text-gray-600">Package Facilities</Text>
                    </View>
                    <ScrollView horizontal className="mt-1">
                        {[1, 2, 3, 4, 5, 6].map((item, index) => {
                            return (
                                <TouchableWithoutFeedback key={index}>
                                    <View className="w-16 mx-2">
                                        <View className="w-full h-16 bg-violet-300 rounded-xl"></View>
                                        <Text className="text-center font-[BalooBold] text-gray-400">Board</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            );
                        })}
                    </ScrollView>
                    <TouchableWithoutFeedback>
                        <View className="w-[95%] mx-2 bg-[#2DAFBC] rounded-2xl pt-4 pb-3 mt-2">
                            <Text className="text-center font-[BalooBold] text-white w-full text-xl">Book Now - $650</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    );
}
