import { View, Text, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

export default function Place({ item, navigation }) {
    let { name, timezone, smallUrl } = item;

    return (
        <TouchableOpacity onPress={() => navigation.navigate("detail", item)}>
            <View className="px-2 py-2 mx-2 my-4 h-28 rounded-xl flex flex-row items-center bg-white relative" style={styles.elevation}>
                <View>
                    <Image src={smallUrl} className="w-24 h-full rounded-xl" resizeMode="cover" />
                </View>
                <View className="ml-4">
                    <View className="w-[210px] overflow-hidden">
                        <Text className="font-[BalooBold] text-lg">{name}</Text>
                        <Text className="mb-2 font-[BalooMedium] text-md text-gray-400">{timezone}</Text>
                    </View>
                </View>
                <View className="absolute right-3 bg-slate-100 px-1 py-1 rounded-full">
                    <MaterialCommunityIcons name="share" size={24} color="#555cac" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    elevation: {
        elevation: 100,
        shadowRadius: 10,
        shadowColor: "#e6e8fc",
        shadowOffset: [-50, -50],
    },
});
