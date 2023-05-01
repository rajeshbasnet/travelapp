import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";

export default function ChatbotIcon({ navigation }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("chatbot")}>
            <Animatable.View
                animation={"shake"}
                easing={"ease-out"}
                duration={5000}
                iterationCount={"infinite"}
                className="bg-[#428af5] rounded-full w-14 h-14 items-center justify-center absolute bottom-8 right-0 z-0"
            >
                <MaterialIcons name="message" size={32} color="white" />
            </Animatable.View>
        </TouchableOpacity>
    );
}
