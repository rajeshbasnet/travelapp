import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { getHotelDetails } from "../services/DetailService";
import { replaceUrlWidthHeight } from "../utility/Util";
import { useDispatch, useSelector } from "react-redux";
import { hideAbout, setAbout } from "../redux/detailSlice";
import { Linking } from "react-native";

export default function Detail({ route, navigation }) {
    const { id, urlTemplate } = route.params;

    const [hotelDetails, setHotelDetails] = useState({});
    const {
        rating,
        tags,
        rankingDetails,
        title,
        price,
        address,
        gettingThere,
        about,
        restaurantsNearby,
        attractionsNearby,
        amenitiesScreen,
        geoPoint,
        photos,
        reviews,
    } = hotelDetails;

    let showAbout = useSelector((state) => state.detail.showAbout);
    let dispatch = useDispatch();

    let url = replaceUrlWidthHeight(urlTemplate, 400, 400);

    useLayoutEffect(() => {
        dispatch(hideAbout());
    }, []);

    useEffect(() => {
        getHotelDetails(id).then((detail) => {
            setHotelDetails(detail);
        });
    }, []);

    function phoneCall() {
        Linking.openURL("tel:+977 9802331837");
    }

    function openGps() {
        if (geoPoint) {
            const scheme = Platform.select({
                ios: "maps:0,0?q=",
                android: "geo:0,0?q=",
            });
            const latLng = `${geoPoint.latitude},${geoPoint.longitude}`;
            const label = title;
            const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`,
            });

            console.log(url);
            Linking.openURL(url);
        }
    }

    return (
        <ScrollView>
            <SafeAreaView className="flex-1">
                <View className="relative">
                    <View className="relative h-[260px]">
                        <ImageBackground
                            src={url}
                            resizeMode="cover"
                            className="w-full h-full"
                        />
                        <View
                            className="absolute w-full h-full"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                        ></View>
                    </View>
                    <View className="mx-2 mt-2 absolute">
                        <TouchableWithoutFeedback
                            onPress={() => navigation.pop()}
                        >
                            <View className="px-2 py-2 rounded-full">
                                <Ionicons
                                    name="ios-arrow-undo-circle-outline"
                                    size={28}
                                    color="white"
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View className="absolute bottom-[20%] mx-8">
                        <Text className="font-[BalooBold] text-3xl text-white w-[300px] leading-10">
                            {title}
                        </Text>
                        <View className="items-center flex-row justify-between w-[90%]">
                            <Text className="text-white font-[BalooBold] text-md">
                                {address && address.slice(0, -23)}
                            </Text>
                            <View className="flex-row items-baseline">
                                <AntDesign
                                    name="star"
                                    size={15}
                                    color="#F5D04A"
                                />
                                <Text className="text-white font-[BalooBold] text-md ml-2">
                                    {rating || 0}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={openGps}>
                                <View>
                                    <Feather
                                        name="map-pin"
                                        size={30}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="bg-[#F4F5FF] rounded-3xl bottom-10 h-full">
                    <View className="mt-8 mx-4">
                        <View className="flex-row items-center flex-wrap mb-4">
                            {tags &&
                                tags.map((tag, index) => {
                                    return (
                                        <Text
                                            key={index}
                                            className="text-[12px] leading-5 text-gray-50 bg-amber-700 px-2 mr-1 rounded-lg font-[SansMedium]"
                                        >
                                            {tag}
                                        </Text>
                                    );
                                })}
                        </View>
                        <Text className="font-[BalooBold] text-xl text-gray-600">
                            About
                        </Text>
                        <Text className="text-[12px] leading-5 text-gray-500 text-justify">
                            {about && (showAbout ? about : about.slice(0, 150))}
                            <TouchableWithoutFeedback
                                onPress={() => dispatch(setAbout())}
                            >
                                <Text className="text-[#2DAFBC]">
                                    &nbsp;&nbsp;
                                    {about && showAbout
                                        ? "Read Less"
                                        : "Read More"}
                                </Text>
                            </TouchableWithoutFeedback>
                        </Text>
                        <View className="my-4">
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            >
                                {photos &&
                                    photos.map((photo, index) => {
                                        const moreUrl = replaceUrlWidthHeight(
                                            photo?.urlTemplate,
                                            300,
                                            300
                                        );
                                        return (
                                            <View
                                                className="mx-2 rounded-3xl"
                                                key={index}
                                            >
                                                <Image
                                                    src={moreUrl}
                                                    className="w-[250px] h-[120px] rounded-xl"
                                                    resizeMode="cover"
                                                />
                                            </View>
                                        );
                                    })}
                            </ScrollView>
                        </View>

                        {/** Amenities Section */}
                        <View className="mt-3">
                            <Text className="font-[BalooBold] text-xl text-gray-600">
                                Amenities
                            </Text>
                            <View>
                                {amenitiesScreen &&
                                    amenitiesScreen
                                        .splice(0, 5)
                                        .map((item, index) => {
                                            return (
                                                <Text
                                                    key={index}
                                                    className="text-[12px] leading-5 text-gray-500 text-justify"
                                                >
                                                    {item}
                                                </Text>
                                            );
                                        })}
                            </View>
                        </View>

                        {/** Reviews Sectino */}
                        <View className="mt-5">
                            <Text className="font-[BalooBold] text-xl text-gray-600">
                                Reviews
                            </Text>
                            <View>
                                {reviews &&
                                    reviews?.content?.map((item, index) => {
                                        return (
                                            <View
                                                key={index}
                                                className="my-2 bg-white px-2 py-2 rounded-md shadow-blue-300"
                                                style={{
                                                    elevation: 100,
                                                }}
                                            >
                                                <Text className="text-md font-[SansMedium] text-gray-600">
                                                    {item.title}
                                                </Text>
                                                <Text className="text-[12px] leading-5 text-gray-500 text-justify my-2">
                                                    {item.text
                                                        .slice(0, 300)
                                                        .split("<br />")
                                                        .map((item) => item)}
                                                </Text>
                                                <View className="items-end">
                                                    <Text className="text-[12px] leading-5 text-gray-500 w-[150px] text-right">
                                                        {item.publishedDate}
                                                    </Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                            </View>
                        </View>

                        <TouchableOpacity>
                            <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
                                    Book at ${price}
                                </Text>
                                <View className="absolute right-2 top-[70%]">
                                    <Entypo
                                        name="chevron-right"
                                        size={22}
                                        color="black"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/** Split */}
                        <View className="flex-row items-center">
                            <View className="bg-gray-200 h-[1px] flex-1"></View>
                            <Text className="font-[SansMedium] text-md text-gray-400 my-2 mx-4 text-center">
                                or
                            </Text>
                            <View className="bg-gray-200 h-[1px] flex-1"></View>
                        </View>

                        {/** Phone Call */}
                        <TouchableOpacity onPress={phoneCall}>
                            <View className="mt-2 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
                                    Phone Call
                                </Text>
                                <View className="absolute right-2 top-[70%]">
                                    <Entypo
                                        name="phone"
                                        size={22}
                                        color="black"
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
