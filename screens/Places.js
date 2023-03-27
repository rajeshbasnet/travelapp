import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Hotel } from "../assets/images";

export default function Places({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-[#F4F5FF]">
            <View className="mx-2 my-2 flex flex-row items-center justify-between bg-white px-1 py-1 rounded-3xl" style={styles.elevation}>
                <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                    <View className="bg-slate-100 px-2 py-2 rounded-full">
                        <FontAwesome5 name="chevron-circle-left" size={20} color="black" />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View className="bg-slate-100 px-3 py-2 rounded-full">
                        <FontAwesome name="user" size={20} color="black" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View className="mt-10 flex-1">
                <View className="mx-4">
                    <Text className="font-[BalooBold] text-3xl">The Best Hotels nearby</Text>
                    <Text className="font-[BalooBold] text-3xl">your Place.</Text>
                </View>

                <FlatList
                    className="mx-2 mt-2"
                    data={[1, 2, 3, 4, 5, 6]}
                    showsVerticalScrollIndicator={false}
                    renderItem={() => {
                        return (
                            <TouchableWithoutFeedback onPress={() => navigation.navigate("detail")}>
                                <View
                                    className="px-2 py-2 mx-2 my-4 h-32 rounded-xl flex flex-row items-center bg-white relative"
                                    style={styles.elevation}
                                >
                                    <View>
                                        <Image source={Hotel} className="w-32 h-full rounded-xl" resizeMode="cover" />
                                    </View>
                                    <View className="ml-4">
                                        <View>
                                            <Text className="font-[BalooBold] text-xl">Barabudur</Text>
                                            <Text className="mb-2 font-[BalooMedium] text-lg text-gray-400">Magelong</Text>
                                        </View>
                                    </View>
                                    <View className="absolute right-6 bg-slate-100 px-2 py-2 rounded-full">
                                        <MaterialCommunityIcons name="share" size={24} color="black" />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    }}
                    keyExtractor={(item) => item}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    elevation: {
        elevation: 5,
        shadowRadius: 10,
        shadowColor: "#4A5AFC",
        shadowOffset: [-50, -50],
    },
});
