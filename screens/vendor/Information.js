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
import {
    setIsValidated,
    setVendorDetail,
    setVendorUsername,
} from "../../redux/HotelSlice";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export default function Information({ navigation, route }) {
    const vendorUsername = route.params.username;

    const vendorDetail = useSelector((state) => state.hotel.vendorDetail);
    const isValidated = useSelector((state) => state.hotel.isValidated);

    const dispatch = useDispatch();

    function validateInformation() {
        if (vendorDetail.title && vendorDetail.address && vendorDetail.about) {
            dispatch(setIsValidated(true));
        } else {
            if (isValidated) {
                dispatch(setIsValidated(false));
            }
        }
    }

    useEffect(() => {
        validateInformation();
        if (vendorUsername) {
            dispatch(setVendorUsername(vendorUsername));
        } else {
            navigation.popToTop();
        }
    }, [vendorDetail]);

    return (
        <SafeAreaView className="flex-1 w-full bg-white">
            <ScrollView>
                <View className="flex-1 w-[90%] mx-auto mt-10">
                    <Image
                        source={require("../../assets/lottie/info.gif")}
                        resizeMode="contain"
                        className="h-[150px] w-full mx-auto"
                    />

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Enter a hotel name
                        </Text>
                        <TextInput
                            placeholder="e.g. Hyaat Regency Hotel"
                            className="border border-gray-300 rounded-xl px-4 py-3"
                            value={vendorDetail.title}
                            onChangeText={(value) =>
                                dispatch(
                                    setVendorDetail({
                                        ...vendorDetail,
                                        title: value,
                                    })
                                )
                            }
                        />
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Enter your address
                        </Text>
                        <View className="relative">
                            <TextInput
                                placeholder="e.g. Sakhamaul, New Baneshwor"
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={vendorDetail.address}
                                onChangeText={(value) =>
                                    dispatch(
                                        setVendorDetail({
                                            ...vendorDetail,
                                            address: value,
                                        })
                                    )
                                }
                            />
                        </View>
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Provide some descriptions about your hotel !
                        </Text>
                        <View className="relative">
                            <TextInput
                                multiline
                                numberOfLines={5}
                                placeholder="e.g. About hotel..."
                                style={{ textAlignVertical: "top" }}
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={vendorDetail.about}
                                onChangeText={(value) =>
                                    dispatch(
                                        setVendorDetail({
                                            ...vendorDetail,
                                            about: value,
                                        })
                                    )
                                }
                            />
                        </View>
                    </View>
                    {isValidated ? (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("hotel_detail")}
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
