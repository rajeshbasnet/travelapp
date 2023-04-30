import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/shared/Header";
import { getHotels } from "../services/PlaceService";
import { useDispatch, useSelector } from "react-redux";
import { setHotels } from "../redux/placeSlice";
import Place from "../components/places/Place";
import { setLoading } from "../redux/globalSlice";

export default function Places({ navigation }) {
    const hotels = useSelector((state) => state.place.hotels);
    let loading = useSelector((state) => state.global.loading);

    let dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(setLoading(true));
    }, []);

    useEffect(() => {
        getHotels().then((responseData) => {
            dispatch(setHotels(responseData));
            dispatch(setLoading(false));
        });
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F4F5FF]">
            {/** Header for Places Screen */}
            <Header navigation={navigation} />

            <View className="mt-6 flex-1">
                <View className="mx-4">
                    <Text className="font-[BalooBold] text-3xl">
                        The Best Hotels nearby
                    </Text>
                    <Text className="font-[BalooBold] text-3xl">
                        your Place.
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
