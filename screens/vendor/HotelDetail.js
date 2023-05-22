import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setIsValidated, setVendorDetail } from "../../redux/HotelSlice";
import { FontAwesome } from "@expo/vector-icons";
import { useLayoutEffect } from "react";

export default function HotelDetail({ navigation }) {
    const vendorDetail = useSelector((state) => state.hotel.vendorDetail);
    const isValidated = useSelector((state) => state.hotel.isValidated);

    const dispatch = useDispatch();

    function validateInformation() {
        if (
            vendorDetail.price &&
            vendorDetail.amenitiesScreen &&
            vendorDetail.tags
        ) {
            dispatch(setIsValidated(true));
        } else {
            if (isValidated) {
                dispatch(setIsValidated(false));
            }
        }
    }

    useEffect(() => {
        validateInformation();
    }, [vendorDetail]);

    useLayoutEffect(() => {
        dispatch(setIsValidated(false));
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white w-full">
            <ScrollView>
                <View className="flex-1 w-[90%] mx-auto mt-10">
                    <Image
                        source={require("../../assets/lottie/info.gif")}
                        resizeMode="contain"
                        className="h-[150px] w-full mx-auto"
                    />

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            How much do you charge per stay ?
                        </Text>
                        <View className="relative">
                            <TextInput
                                placeholder="e.g. $500"
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={vendorDetail.price}
                                onChangeText={(value) =>
                                    dispatch(
                                        setVendorDetail({
                                            ...vendorDetail,
                                            price: value,
                                        })
                                    )
                                }
                            />
                        </View>
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            What facilities do you provide ?
                        </Text>
                        <View className="relative">
                            <TextInput
                                multiline
                                numberOfLines={4}
                                style={{ textAlignVertical: "top" }}
                                placeholder="e.g. Free Parking, Free Wifi"
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={vendorDetail.amenitiesScreen}
                                onChangeText={(value) =>
                                    dispatch(
                                        setVendorDetail({
                                            ...vendorDetail,
                                            amenitiesScreen: value,
                                        })
                                    )
                                }
                            />
                        </View>
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Add tags for better search !
                        </Text>
                        <View className="relative">
                            <TextInput
                                multiline
                                numberOfLines={4}
                                style={{ textAlignVertical: "top" }}
                                placeholder="e.g. Charming, Romantic, Classic, Great View"
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={vendorDetail.tags}
                                onChangeText={(value) =>
                                    dispatch(
                                        setVendorDetail({
                                            ...vendorDetail,
                                            tags: value,
                                        })
                                    )
                                }
                            />
                        </View>
                    </View>

                    {isValidated ? (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("image_collection")
                            }
                        >
                            <View className="flex-row justify-end mt-6">
                                <View className=" bg-blue-500 px-2 py-2 w-[50px] h-[50px] items-center justify-center rounded-full">
                                    <FontAwesome
                                        name="long-arrow-right"
                                        size={24}
                                        color="white"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
