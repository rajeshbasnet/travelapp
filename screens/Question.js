import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { USER, VENDOR } from "../constants/GlobalConstants";

export default function Question({ navigation }) {
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center bg-white w-[80%] mx-auto">
                <Image
                    source={require("../assets/lottie/question.gif")}
                    className="w-[50%] h-[250px] mx-auto"
                    resizeMode="contain"
                />
                <Text className="text-center font-[BalooBold] text-2xl text-gray-700">
                    Which one are you ?
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("register", {
                            role: USER,
                        })
                    }
                >
                    <View className="border-2 border-gray-500 w-full py-4 my-4">
                        <Text className="w-full text-center font-[SansBold] text-lg text-gray-700">
                            Customer
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("register", { role: VENDOR })
                    }
                >
                    <View className="border-2 border-gray-500 w-full py-4 my-4">
                        <Text className="w-full text-center font-[SansBold] text-lg text-gray-700">
                            Vendor
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
