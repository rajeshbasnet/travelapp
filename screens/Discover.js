import { View, Text, TextInput, ScrollView, ImageBackground, TouchableWithoutFeedback, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Attraction, Hotel, Resturant } from "../assets/images";

export default function Discover() {
    return (
        <SafeAreaView className="flex-1 bg-[#F4F5FF]">
            <View className="mx-4 mt-4">
                {/** User Information Component */}
                <View className="flex flex-row items-center">
                    <Text className="w-12 h-12 rounded-full bg-gray-200"></Text>
                    <Text className="font-[baloo-semibold] ml-4 text-[15px] text-[#3D3D3F]">Hello, Dennis</Text>
                </View>

                {/** Header Text */}
                <View className="mt-8">
                    <Text className="text-3xl font-[baloo-extrabold] text-[#3D3D3F] tracking-wide">Let's Travel</Text>
                    <Text className="text-3xl font-[baloo-extrabold] text-[#3D3D3F] tracking-wide">Now</Text>
                </View>

                {/** Search Container */}
                <View className="mt-4 relative">
                    <TextInput className="font-[baloo-regular] px-4 py-3 border rounded-3xl border-gray-300 text-md" placeholder="Search Location" />
                    <View className="absolute right-4 top-[25%]">
                        <Feather name="search" size={24} color="#BABBC1" />
                    </View>
                </View>

                {/** Travel Plannings */}
                <View className="mt-6">
                    <Text className="font-[baloo-bold] text-xl">Travel Plannings</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-1">
                        <View className="relative w-[300px] h-[150px]">
                            <View className="w-full h-full">
                                <ImageBackground
                                    key={"hotel"}
                                    source={Hotel}
                                    className="w-full h-full rounded-3xl overflow-hidden"
                                    resizeMode="cover"
                                />
                                <View className="absolute w-full h-full rounded-3xl" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}></View>
                            </View>
                            <View className="absolute bottom-1 left-6">
                                <Text className="font-[baloo-extrabold] text-xl text-white">Hotels</Text>
                            </View>
                        </View>

                        <View className="relative w-[300px] h-[150px] ml-4">
                            <View className="w-full h-full">
                                <ImageBackground
                                    key={"resturant"}
                                    source={Resturant}
                                    className="w-full h-full rounded-3xl overflow-hidden"
                                    resizeMode="cover"
                                />
                                <View className="absolute w-full h-full rounded-3xl" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}></View>
                            </View>
                            <View className="absolute bottom-1 left-6">
                                <Text className="font-[baloo-extrabold] text-xl text-white">Resturant</Text>
                            </View>
                        </View>

                        <View className="relative w-[300px] h-[150px] ml-4">
                            <View className="w-full h-full">
                                <ImageBackground
                                    key={"attraction"}
                                    source={Attraction}
                                    className="w-full h-full rounded-3xl overflow-hidden"
                                    resizeMode="cover"
                                />
                                <View className="absolute w-full h-full rounded-3xl" style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}></View>
                            </View>
                            <View className="absolute bottom-1 left-6">
                                <Text className="font-[baloo-extrabold] text-xl text-white">Attraction</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/** Popular Places */}
                <View className="mt-4">
                    <View className="flex flex-row items-start justify-between">
                        <Text className="font-[baloo-bold] text-xl">Popular Place</Text>
                        <TouchableWithoutFeedback>
                            <Text className="font-[baloo-medium] text-gray-400">See more</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View
                            className="px-2 py-2 mx-2 my-2 w-[240px] h-28 rounded-xl flex flex-row items-center bg-white"
                            style={{ elevation: 5, shadowRadius: 10, shadowColor: "#4A5AFC", shadowOffset: [-50, -50] }}
                        >
                            <View>
                                <Image source={Hotel} className="w-20 h-full rounded-xl" resizeMode="cover" />
                            </View>
                            <View className="ml-4">
                                <Text className="font-[baloo-bold] text-md">Barabudur</Text>
                                <Text className="mb-2 font-[baloo-medium] text-sm text-gray-400">Magelong</Text>
                                <View className="flex-row items-center">
                                    <AntDesign name="star" size={15} color="#F0C230" />
                                    <Text className="ml-2">4.5</Text>
                                    <TouchableWithoutFeedback>
                                        <Text className="text-[#2DAFBC] ml-2">See Details</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>

                        <View
                            className="px-2 py-2 mx-2 my-2 w-[240px] h-28 rounded-xl flex flex-row items-center bg-white"
                            style={{ elevation: 5, shadowRadius: 10, shadowColor: "#4A5AFC", shadowOffset: [-50, -50] }}
                        >
                            <View>
                                <Image source={Hotel} className="w-20 h-full rounded-xl" resizeMode="cover" />
                            </View>
                            <View className="ml-4">
                                <Text className="font-[baloo-bold] text-md">Barabudur</Text>
                                <Text className="mb-2 font-[baloo-medium] text-sm text-gray-400">Magelong</Text>
                                <View className="flex-row items-center">
                                    <AntDesign name="star" size={15} color="#F0C230" />
                                    <Text className="ml-2">4.5</Text>
                                    <TouchableWithoutFeedback>
                                        <Text className="text-[#2DAFBC] ml-2">See Details</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>

                        <View
                            className="px-2 py-2 mx-2 my-2 w-[240px] h-28 rounded-xl flex flex-row items-center bg-white"
                            style={{ elevation: 5, shadowRadius: 10, shadowColor: "#4A5AFC", shadowOffset: [-50, -50] }}
                        >
                            <View>
                                <Image source={Hotel} className="w-20 h-full rounded-xl" resizeMode="cover" />
                            </View>
                            <View className="ml-4">
                                <Text className="font-[baloo-bold] text-md">Barabudur</Text>
                                <Text className="mb-2 font-[baloo-medium] text-sm text-gray-400">Magelong</Text>
                                <View className="flex-row items-center">
                                    <AntDesign name="star" size={15} color="#F0C230" />
                                    <Text className="ml-2">4.5</Text>
                                    <TouchableWithoutFeedback>
                                        <Text className="text-[#2DAFBC] ml-2">See Details</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
}
