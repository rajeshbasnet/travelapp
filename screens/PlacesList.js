import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Header from "../components/shared/Header";
import { useDispatch, useSelector } from "react-redux";
import { setHotels } from "../redux/placeSlice";
import { getHotelsByAddress } from "../services/PlaceService";
import { useEffect } from "react";
import { FlatList } from "react-native";
import Place from "../components/places/Place";
import { setLoading } from "../redux/globalSlice";
import { useLayoutEffect } from "react";

export default function PlacesList({ navigation, route }) {
    const place_name = route.params?.place;
    console.log(place_name);

    const dispatch = useDispatch();

    const hotels = useSelector((state) => state.place.hotels);
    const loading = useSelector((state) => state.global.loading);

    async function getHotels() {
        try {
            const response = await getHotelsByAddress(place_name);
            if (response) {
                dispatch(setHotels(response));
                dispatch(setLoading(false));
            }
        } catch (error) {
            navigation.navigate("discover");
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getHotels();
    }, []);

    useLayoutEffect(() => {
        dispatch(setLoading(true));
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 h-full w-full">
            <Header navigation={navigation} />

            <View className="mt-6 flex-1">
                <View className="mx-4">
                    <Text className="font-[BalooBold] text-3xl">
                        Best Hotels at
                    </Text>
                    <Text className="font-[BalooBold] text-3xl">
                        {place_name}.
                    </Text>
                </View>

                <FlatList
                    className="mx-2 mt-2"
                    data={hotels}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <Place item={item} navigation={navigation} />;
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </SafeAreaView>
    );
}
