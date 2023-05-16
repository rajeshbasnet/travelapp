import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import {
    getHotelDetails,
    getHotelDetailsWithoutDest,
    sendMessage,
    updateHotelDetails,
} from "../services/DetailService";
import { replaceUrlWidthHeight } from "../utility/Util";
import { useDispatch, useSelector } from "react-redux";
import { hideAbout, setAbout } from "../redux/detailSlice";
import { Linking } from "react-native";
import { AlertError, AlertSuccess } from "../components/shared/Alert";
import { setError, setLoading, setSuccess } from "../redux/globalSlice";
import { getUserFromToken } from "../services/AuthService";
import { ActivityIndicator } from "react-native";
import Amenities from "../components/detail/Amenities";
import Photos from "../components/detail/Photos";
import Reviews from "../components/detail/Reviews";
import Tags from "../components/detail/Tags";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const checkInUtil = "checkIn";
const checkOutUtil = "checkOut";
const add = "add";
const subtract = "subtract";

export default function Detail({ route, navigation }) {
    const { id, urlTemplate } = route.params;

    let [date, setDate] = useState(new Date());
    let [checkIn, setCheckIn] = useState(new Date());
    let [checkOut, setCheckOut] = useState(new Date());
    let [guestNum, setGuestNum] = useState("1");

    const [hotelDetails, setHotelDetails] = useState({});
    const {
        rating,
        tags,
        title,
        price,
        address,
        about,
        amenitiesScreen,
        geoPoint,
        photos,
        reviews,
    } = hotelDetails;

    let showAbout = useSelector((state) => state.detail.showAbout);
    let success = useSelector((state) => state.global.success);
    let error = useSelector((state) => state.global.error);
    let token = useSelector((state) => state.auth.token);
    let loading = useSelector((state) => state.global.loading);

    let dispatch = useDispatch();

    let url = replaceUrlWidthHeight(urlTemplate, 400, 400);
    let scrollRef = useRef();

    useLayoutEffect(() => {
        dispatch(hideAbout());
        dispatch(setLoading(true));
    }, []);

    useEffect(() => {
        getHotelDetails(id).then((detail) => {
            setHotelDetails({
                ...detail,
                amenitiesScreen:
                    amenitiesScreen.length > 5
                        ? amenitiesScreen.splice(0, 5)
                        : amenitiesScreen,
            });
            dispatch(setLoading(false));
        });
    }, []);

    const onChangeIn = (event, selectedDate) => {
        const currentDate = selectedDate;
        setCheckIn(currentDate);
    };

    const onChangeOut = (event, selectedDate) => {
        const currentDate = selectedDate;
        setCheckOut(currentDate);
    };

    const showMode = (currentMode, action) => {
        if (action == checkInUtil) {
            DateTimePickerAndroid.open({
                value: date,
                onChange: onChangeIn,
                mode: currentMode,
                is24Hour: true,
            });
        } else {
            DateTimePickerAndroid.open({
                value: date,
                onChange: onChangeOut,
                mode: currentMode,
                is24Hour: true,
            });
        }
    };

    const showDatepicker = (action) => {
        showMode("date", action);
    };

    const updateGuestNum = (action) => {
        if (action == add) {
            guestNum = (Number(guestNum) + 1).toString();
            setGuestNum(guestNum);

            if (guestNum >= 4) {
                scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                });

                setGuestNum("3");

                dispatch(setError("Guest is only limited to three people"));
                setTimeout(() => {
                    dispatch(setError(""));
                }, 1500);
            }
        } else {
            if (guestNum >= 2) {
                guestNum = (Number(guestNum) - 1).toString();
                setGuestNum(guestNum);
            }
        }
    };

    function phoneCall() {
        Linking.openURL("tel:+977 9802331837");
    }

    async function addReviews(review) {
        const newReview = {
            ...review,
            publishedDate: `Written ${new Date().toLocaleDateString("en-US")}`,
        };

        const detail = await getHotelDetailsWithoutDest(id);

        if (detail) {
            const rev = detail.reviews.content;
            rev.push(newReview);

            const newDetails = {
                ...detail,
                reviews: {
                    content: rev,
                },
            };

            if (newDetails) {
                scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                });

                await updateHotelDetails(id, newDetails);

                dispatch(setSuccess("Reviews added successfully"));

                setTimeout(() => {
                    dispatch(setSuccess(""));
                }, 1000);
            }
        }
    }

    async function sendMessageToHotel() {
        if (token) {
            try {
                scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
                });

                const user = await getUserFromToken(token);

                if (user) {
                    const message = `Booking Alert!
                    Hello ${title},
                    There is a request pending for booking.
                    Please confirm/cancel booking request by calling customer.
                    Username : ${user?.firstname} ${user?.lastname}
                    Phone number : ${user?.number}`;

                    const response = await sendMessage(message);
                    if (response) {
                        dispatch(setSuccess(response));

                        setTimeout(() => {
                            dispatch(
                                setSuccess(
                                    "Your will recieve a phone call shortly"
                                )
                            );
                        }, 2000);

                        setTimeout(() => {
                            dispatch(setSuccess(""));
                        }, 4000);
                    }
                }
            } catch (error) {
                dispatch(setError("Cannot book your request right now"));

                setTimeout(() => {
                    dispatch(setError(""));
                }, 1500);
            }
        } else {
            dispatch(setError("User must login in order to book"));
            navigation.navigate("login");
        }
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

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        );
    }

    return (
        <ScrollView ref={scrollRef}>
            <SafeAreaView className="flex-1">
                {error && <AlertError message={error} />}
                {success && <AlertSuccess message={success} />}

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
                            <Ionicons
                                name="ios-arrow-back"
                                size={30}
                                color="white"
                            />
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
                        {/** Tags Section */}
                        <Tags tags={tags} />

                        {/** About Section */}
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

                        {/** Photos Section */}
                        <Photos photos={photos} />

                        {/** Amenities Section */}
                        <Amenities amenitiesScreen={amenitiesScreen} />

                        {/** Guests * Check In and Check Out */}
                        <View className="my-6">
                            <Text className="font-[BalooBold] text-xl text-gray-600">
                                Date of Travel & Guests
                            </Text>

                            <View className="flex-row items-center justify-center bg-[#1e81b0] py-4 rounded-lg mt-1">
                                {/** Check In Section */}
                                <TouchableOpacity
                                    onPress={() => showDatepicker(checkInUtil)}
                                >
                                    <View className="px-4">
                                        <Text className="font-[SansMedium] tracking-tight text-white">
                                            Check In
                                        </Text>
                                        <TextInput
                                            className="font-[SansMedium] tracking-tight text-gray-200 mt-2"
                                            editable={false}
                                            value={checkIn.toLocaleDateString()}
                                        />
                                    </View>
                                </TouchableOpacity>

                                {/** Check Out Section */}
                                <TouchableOpacity
                                    onPress={() => showDatepicker(checkOutUtil)}
                                >
                                    <View className="border-l-2 px-6 border-r-2 border-white">
                                        <Text className="font-[SansMedium] tracking-tight  text-white">
                                            Check Out
                                        </Text>
                                        <TextInput
                                            className="font-[SansMedium] tracking-tight text-gray-200 mt-2"
                                            editable={false}
                                            value={checkOut.toLocaleDateString()}
                                        />
                                    </View>
                                </TouchableOpacity>

                                {/** Guests section */}
                                <View className="px-6">
                                    <Text className="font-[SansMedium] tracking-tight text-center text-white">
                                        Guests
                                    </Text>
                                    <View className="flex-row items-center mt-2">
                                        <TouchableOpacity
                                            onPress={() =>
                                                updateGuestNum(subtract)
                                            }
                                        >
                                            <View className="pr-2">
                                                <Entypo
                                                    name="circle-with-minus"
                                                    size={24}
                                                    color="white"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                        <Text className="font-[SansMedium] text-lg text-white">
                                            {guestNum}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => updateGuestNum(add)}
                                        >
                                            <View className="pl-2">
                                                <Entypo
                                                    name="circle-with-plus"
                                                    size={24}
                                                    color="white"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity onPress={sendMessageToHotel}>
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

                        {/** Reviews Sectino */}
                        <Reviews reviews={reviews} addReviews={addReviews} />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
