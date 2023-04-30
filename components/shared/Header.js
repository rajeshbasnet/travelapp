import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";

export default function Header({ navigation }) {
    return (
        <View className="mx-2 my-2 flex flex-row items-center justify-between px-1 py-1">
            <TouchableOpacity onPress={() => navigation.pop()}>
                <Ionicons
                    name="ios-arrow-undo-circle-outline"
                    size={35}
                    color="black"
                />
            </TouchableOpacity>
        </View>
    );
}
