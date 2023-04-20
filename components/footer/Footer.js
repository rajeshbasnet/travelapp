import { View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { DASHBOARD, DISCOVER } from "../../constants/GlobalConstants";

export default function Footer({ navigation }) {
    const route = navigation.getState().routes[0];
    const { name } = route;

    return (
        <View className="w-full flex-1">
            <View className="bg-[#555cac] w-[150px] rounded-[50px] py-5 flex-row items-center justify-center mx-auto fixed top-[6%]">
                <TouchableOpacity className="mr-5">
                    <AntDesign name="home" size={24} color={name == DISCOVER ? "#FBA401" : "#7c97ab"} />
                </TouchableOpacity>
                <TouchableOpacity className="ml-5">
                    <FontAwesome5 name="user" size={24} color={name == DASHBOARD ? "#FBA401" : "#7c97ab"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
