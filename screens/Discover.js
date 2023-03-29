import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity, Keyboard } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../components/shared/Search";
import Footer from "../components/footer/Footer";
import { useDispatch } from "react-redux";
import { hideAutoComplete } from "../redux/locationAutoCompleteSlice";
import PopularPlace from "../components/discover/PopularPlace";
import TravelPlannnings from "../components/discover/TravelPlannnings";

export default function Discover({ navigation }) {
    const dispatch = useDispatch();

    function hideAutoCompleteAndKeyBoard() {
        dispatch(hideAutoComplete());
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={hideAutoCompleteAndKeyBoard}>
            <SafeAreaView className="flex-1 bg-[#F4F5FF] relative">
                <View className="mx-4 mt-4 h-full">
                    {/** User Information Component */}
                    <View className="flex flex-row items-center">
                        <Text className="w-12 h-12 rounded-full bg-gray-200"></Text>
                        <Text className="font-[BalooMedium] ml-4 text-[15px] text-[#3D3D3F]">Hello, Dennis</Text>
                    </View>

                    {/** Header Text */}
                    <View className="mt-8">
                        <Text className="text-3xl font-[BalooExtrabold] text-[#3D3D3F] tracking-wide">Let's Travel</Text>
                        <Text className="text-3xl font-[BalooExtrabold] text-[#3D3D3F] tracking-wide">Now</Text>
                    </View>

                    {/** Search Container */}
                    <Search />

                    {/** Travel Plannings */}
                    <TravelPlannnings navigation={navigation} />

                    {/** Popular Places */}
                    <PopularPlace />

                    {/** Footer */}
                    <Footer navigation={navigation} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
