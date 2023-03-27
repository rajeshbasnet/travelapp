import { View, Text, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Hotel } from "../../assets/images";

export default function PopularPlace() {
    return (
        <View className="mt-4">
            <View className="flex flex-row items-start justify-between">
                <Text className="font-[BalooBold] text-xl">Popular Place</Text>
                <TouchableWithoutFeedback>
                    <Text className="font-[BalooMedium] text-gray-400">See more</Text>
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
                        <Text className="font-[BalooBold] text-md">Barabudur</Text>
                        <Text className="mb-2 font-[BalooMedium] text-sm text-gray-400">Magelong</Text>
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
    );
}
