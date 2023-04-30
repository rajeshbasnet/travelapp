import { View, Text, ActivityIndicator } from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/shared/Header";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native";
import AttractionList from "../components/attractions/AttractionList";
import { setLoading } from "../redux/globalSlice";

export default function Attractions({ navigation }) {
    let popularPlaces = useSelector((state) => state.place.attractions);
    let loading = useSelector((state) => state.global.loading);

    let dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(setLoading(true));

        setTimeout(() => {
            dispatch(setLoading(false));
        }, 200);
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1">
            <Header navigation={navigation} />

            <View className="mx-4 mt-6">
                <Text className="font-[BalooBold] text-3xl">
                    Best attractions nearby
                </Text>
                <Text className="font-[BalooBold] text-3xl">your place.</Text>
            </View>

            <FlatList
                className="mx-2 mt-2 flex-1"
                showsVerticalScrollIndicator={false}
                data={popularPlaces}
                renderItem={({ item }) => (
                    <AttractionList place={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.xid}
            />
        </SafeAreaView>
    );
}
