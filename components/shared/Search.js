import { View, TextInput, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import LocationAutoComplete from "./LocationAutoComplete";
import { useDispatch } from "react-redux";
import { showAutoComplete } from "../../redux/locationAutoCompleteSlice";

export default function Search() {
    const dispatch = useDispatch();

    return (
        <View className="mt-4 relative">
            <TextInput
                className="font-[BalooRegular] px-4 py-3 border rounded-3xl border-gray-300 text-md"
                placeholder="Search Location"
                onFocus={() => dispatch(showAutoComplete())}
            />
            <View className="absolute right-4 top-[25%]">
                <Feather name="search" size={24} color="#BABBC1" />
            </View>

            {/** Search Autocomplete */}
            <LocationAutoComplete />
        </View>
    );
}
