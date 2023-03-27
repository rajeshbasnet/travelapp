import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

export default function LocationAutoComplete() {
    const autoCompleteShow = useSelector((state) => state.location.show);

    return (
        autoCompleteShow && (
            <View className="h-[150px] py-4 rounded-3xl bg-[#fbfbff] absolute w-full top-[100%] z-20" style={styles.elevation}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity className="px-4 py-2">
                        <Text className="text-[16px] font-[BalooBold] leading-5">Kathmandu</Text>
                        <Text className="font-[BalooRegular] text-md leading-5">location.display_address</Text>
                        <View className="w-full bg-gray-200 h-[2px] my-1"></View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
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
