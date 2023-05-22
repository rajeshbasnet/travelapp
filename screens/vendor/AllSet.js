import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React from "react";
import * as Location from "expo-location";
import {
    setError,
    setLoading,
    setLocation,
    setSuccess,
} from "../../redux/globalSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { extractStringToArray } from "../../utility/Util";
import { indexHotelDetails } from "../../services/VendorService";
import { setVendorDetail } from "../../redux/HotelSlice";

export default function AllSet({ navigation }) {
    const location = useSelector((state) => state.global.location);
    const vendorDetail = useSelector((state) => state.hotel.vendorDetail);
    const vendorUsername = useSelector((state) => state.hotel.vendorUsername);
    const loading = useSelector((state) => state.global.loading);

    const dispatch = useDispatch();

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
                dispatch(
                    setVendorDetail({
                        ...vendorDetail,
                        geoPoint: {
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        },
                    })
                );
            }
        }
    };

    async function addHotel() {
        try {
            dispatch(setLoading(true));
            const newAmenitiesScreen = extractStringToArray(
                vendorDetail.amenitiesScreen
            );
            const newTags = extractStringToArray(vendorDetail.tags);

            const newDetail = { ...vendorDetail };
            newDetail.amenitiesScreen = newAmenitiesScreen;
            newDetail.tags = newTags;

            console.log({
                ...newDetail,
                amenitiesScreen: newAmenitiesScreen,
                tags: newTags,
            });

            const response = await indexHotelDetails(
                {
                    ...newDetail,
                    amenitiesScreen: newAmenitiesScreen,
                    tags: newTags,
                },
                vendorUsername
            );
            if (response) {
                dispatch(setLoading(false));
                dispatch(setSuccess("Hotel added successfully"));
                navigation.navigate("progress");
            }
        } catch (error) {
            dispatch(setError("Sorry, cannot add hotel right now"));
            navigation.popToTop();
        }
    }

    useEffect(() => {
        requestLocationPermissionHandler();
    }, []);

    useLayoutEffect(() => {
        dispatch(setLoading(false));
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require("../../assets/lottie/check.gif")}
                    className="w-[200px] h-[200px] mx-auto"
                    resizeMode="contain"
                />
                <Text className="font-[BalooBold] text-3xl leading-10 my-5">
                    You are all set to go!
                </Text>
            </View>

            <TouchableOpacity onPress={addHotel}>
                <View className="flex-row justify-end pb-8 px-4">
                    <View className=" bg-blue-500 px-2 py-2 w-[50px] h-[50px] items-center justify-center rounded-full">
                        <FontAwesome
                            name="long-arrow-right"
                            size={24}
                            color="white"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
