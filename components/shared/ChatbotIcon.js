import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function ChatbotIcon({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("chatbot")}>
            <View className="bg-[#428af5] rounded-full w-14 h-14 items-center justify-center absolute bottom-8 right-0">
                <MaterialIcons name="message" size={32} color="white" />
            </View>
        </TouchableOpacity>
    );
}
