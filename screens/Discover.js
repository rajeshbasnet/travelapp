import React, { useEffect, useState } from "react";

import { View, Text, Image, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";

import { AvatarImage } from "../assets";

export default function Discover() {
    const apiKey = "pk.af24012aa2a8e12eb18b85f9011adcb3";

    const [searchText, setSearchText] = useState("");
    const [locations, setLocations] = useState([]);
    const [hideSearchAutoCompleteView, setHideSearchAutoCompleteView] = useState(true);

    async function getLocationAutocompleteResponse() {
        const limit = 5;
        const dedupe = 1;
        const url = `https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${searchText}&limit=${limit}&dedupe=${dedupe}`;

        try {
            const response = await axios.get(url);
            setLocations([...response.data]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocationAutocompleteResponse();
    }, [searchText]);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                setHideSearchAutoCompleteView(true);
                Keyboard.dismiss();
            }}
        >
            <SafeAreaView className="flex-1 bg-white relative">
                {/* First Section */}
                <View className="flex-row items-center justify-between px-8">
                    <View>
                        <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
                        <Text className="text-[#527283] text-[36px]">the beauty today</Text>
                    </View>
                    <View className="w-12 h-12 rounded-md items-center justify-center">
                        <Image source={AvatarImage} className="w-full h-full rounded-md" />
                    </View>
                </View>

                {/* Search Section */}
                <View className="flex-row items-center bg-white mx-4 mt-4 shadow-lg rounded-sm">
                    <TextInput
                        value={searchText}
                        onChangeText={(val) => {
                            setSearchText(val);
                            setHideSearchAutoCompleteView(false);
                        }}
                        className="w-full h-full py-2 px-4 rounded-xl"
                    />
                </View>

                {/* Location Auto Complete Display Result Section */}
                {hideSearchAutoCompleteView || (
                    <View className="h-[150px] mx-4 py-4 rounded-b-xl bg-white shadow-lg">
                        <ScrollView>
                            {locations.map((location, index) => {
                                return (
                                    <TouchableOpacity className="px-2 py-2" key={index}>
                                        <Text className="font-bold text-[16px]">{location.display_place}</Text>
                                        <Text>{location.display_address}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                )}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
