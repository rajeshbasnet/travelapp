import { View, Text, Image, TouchableWithoutFeedback, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { getHotelDetails } from "../services/DetailService";
import { replaceUrlWidthHeight } from "../utility/Util";

export default function Detail({ route, navigation }) {
    console.log(route.params);
    const { id, urlTemplate } = route.params;

    const [hotelDetails, setHotelDetails] = useState({});
    const { rating, title, rankingDetails, restaurantNearByList, attractionNearByList, about, photos, amenitiesScreen, reviews, price } =
        hotelDetails;

    let url = replaceUrlWidthHeight(urlTemplate, 400, 400);

    useEffect(() => {
        getHotelDetails(id).then((detail) => {
            setHotelDetails(detail);
        });
    }, []);

    return (
        <SafeAreaView className="flex-1">
            <View className="relative">
                <View className="relative h-[260px]">
                    <ImageBackground src={url} resizeMode="cover" className="w-full h-full" />
                    <View className="absolute w-full h-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></View>
                </View>
                <View className="mx-2 mt-2 absolute">
                    <TouchableWithoutFeedback onPress={() => navigation.pop()}>
                        <View className="px-2 py-2 rounded-full">
                            <Ionicons name="ios-arrow-undo-circle-outline" size={28} color="white" />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View className="absolute bottom-[20%] mx-8">
                    <Text className="font-[BalooBold] text-3xl text-white w-[300px]">{title}</Text>
                    <View className="flex-row items-center justify-between w-[95%]">
                        <Text className="text-white font-[BalooBold] text-md">{title}</Text>
                        <Text className="text-white font-[BalooBold] text-md">{price}/Package</Text>
                        <View className="flex-row items-baseline">
                            <AntDesign name="star" size={15} color="#F5D04A" />
                            <Text className="text-white font-[BalooBold] text-md ml-2">0</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View className="bg-[#F4F5FF] rounded-3xl bottom-10 h-full">
                <View className="mt-8 mx-4">
                    <Text className="font-[BalooBold] text-xl text-gray-600">About</Text>
                    <Text className="font-[BalooMedium] leading-5 text-gray-400 mt-2">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                        text ever since the 1500s, when an unknown printer took a galley of type and ...{" "}
                        <TouchableWithoutFeedback>
                            <Text className="text-[#2DAFBC]">Read More</Text>
                        </TouchableWithoutFeedback>
                    </Text>
                    <View className="my-4">
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {[1, 2, 3, 4, 5].map((item) => {
                                return (
                                    <View className="mx-2 rounded-3xl" key={item}>
                                        <Image src={url} className="w-[250px] h-[120px] rounded-xl" resizeMode="cover" />
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <TouchableOpacity>
                        <View className="w-[95%] mx-2 bg-[#2DAFBC] rounded-2xl pt-4 pb-3 mt-2">
                            <Text className="text-center font-[BalooBold] text-white w-full text-xl">Book Now &nbsp;&nbsp;&nbsp; {price}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
