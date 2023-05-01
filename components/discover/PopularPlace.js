import {
    View,
    Text,
    TouchableWithoutFeedback,
    ScrollView,
    Image,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    fetchXID,
    getAttractionDetail,
    getAttractionDetails,
    getAttractions,
} from "../../services/DiscoverService";
import { setAttractions } from "../../redux/placeSlice";
import { TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { setLocation } from "../../redux/globalSlice";
import { setLoading } from "../../redux/discoverSlice";
import { useLayoutEffect } from "react";
import AppLoading from "../loading/AppLoading";

export default function PopularPlace({ navigation }) {
    const popularPlaces = useSelector((state) => state.place.attractions);
    const location = useSelector((state) => state.global.location);
    const loading = useSelector((state) => state.discover.loading);

    const dispatch = useDispatch();

    const attractionDetailsHandler = async () => {
        if (location?.timestamp) {
            const attractionDetailList = [];
            const attractions = await getAttractions(
                location?.coords?.latitude,
                location?.coords?.longitude
            );
            const ids = await fetchXID(attractions);

            for (let i = 0; i < ids.length; i++) {
                const detail = await getAttractionDetail(ids[i]);
                attractionDetailList.push(detail);
            }

            dispatch(setAttractions(attractionDetailList));
            dispatch(setLoading(false));
        } else {
            requestLocationPermissionHandler();
        }
    };

    const requestLocationPermissionHandler = async () => {
        if (location.timestamp) {
            return;
        }

        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            //waiting
            return;
        } else {
            let currentLocation = await Location.getCurrentPositionAsync({});
            if (currentLocation) {
                console.log(currentLocation);
                dispatch(setLocation(currentLocation));
            }
        }
    };

    useLayoutEffect(() => {
        dispatch(setLoading(true));
        requestLocationPermissionHandler();
    }, []);

    useEffect(() => {
        if (location?.coords?.latitude) {
            attractionDetailsHandler();
        }
    }, [location]);

    return (
        <View className="mt-8 flex-1">
            <View className="flex flex-row items-start justify-between">
                <Text className="font-[BalooBold] text-xl">Popular Place</Text>
            </View>

            {loading ? (
                <AppLoading />
            ) : (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {popularPlaces &&
                        [...popularPlaces].splice(1, 5).map((place, index) => {
                            const { name, country, road, source, xid } = place;
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        navigation.navigate(
                                            "attraction_detail",
                                            { xid }
                                        )
                                    }
                                >
                                    <View
                                        key={place.id}
                                        className="px-2 py-2 mx-2 my-2 w-[260px] overflow-x-hidden h-32 rounded-xl flex flex-row items-center bg-white"
                                        style={{
                                            elevation: 1000,
                                            shadowRadius: 10,
                                            shadowColor: "#4A5AFC",
                                            shadowOffset: [-50, -50],
                                        }}
                                    >
                                        <View className="flex-1">
                                            <Image
                                                source={{ uri: source }}
                                                className="w-24 h-full rounded-xl"
                                                resizeMode="cover"
                                            />
                                        </View>
                                        <View className="flex-[1.5] ml-4">
                                            <Text className="font-[BalooBold] text-md">
                                                {name}
                                            </Text>
                                            <Text className="font-[BalooMedium] text-[12px] text-gray-400">
                                                {country}
                                            </Text>
                                            <Text className="font-[BalooMedium] text-[12px] text-gray-400">
                                                {road}
                                            </Text>
                                            <Text className="text-[#2DAFBC] text-[12px]">
                                                See Details
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                </ScrollView>
            )}
        </View>
    );
}
