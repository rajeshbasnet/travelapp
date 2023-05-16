import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { replaceUrlWidthHeight } from "../../utility/Util";

export default function Place({ item, navigation }) {
    let { id, title, priceForDisplay, primaryInfo, urlTemplate, rating } = item;

    let url = replaceUrlWidthHeight(urlTemplate, 100, 100);

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("detail", { id, urlTemplate })}
        >
            <View className="px-2 py-2 mx-2 my-4 h-28 rounded-xl flex flex-row items-center bg-white relative">
                {/** Hotel Image */}
                <View>
                    <Image
                        src={url}
                        className="w-24 h-full rounded-xl"
                        resizeMode="cover"
                    />
                </View>

                {/** Hotel Information */}
                <View className="ml-4">
                    <View className="w-[210px] overflow-hidden">
                        <Text className="font-[BalooBold] text-lg">
                            {title}
                        </Text>
                        <Text className="mb-2 font-[BalooMedium] text-md text-gray-400">
                            {primaryInfo || "Asia/Kathmandu"}
                        </Text>
                        <View className="flex-row justify-between w-[40%]">
                            <Text className="font-[BalooBold] text-lg text-gray-800">
                                {priceForDisplay || "$$$"}
                            </Text>
                            <View className="flex-row items-baseline">
                                <AntDesign
                                    name="star"
                                    size={15}
                                    color="#F5D04A"
                                />
                                <Text className="text-gray-400 font-[BalooBold] text-lg ml-1">
                                    {rating}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/** Detail navigate icon */}
                <View className="absolute right-3 bg-slate-100 px-1 py-1 rounded-full">
                    <MaterialCommunityIcons
                        name="share"
                        size={24}
                        color="#555cac"
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}
