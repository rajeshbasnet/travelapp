import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLocation, setSuccess } from "../redux/globalSlice";
import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setLoading } from "../redux/globalSlice";
import { indexHotelDetails } from "../services/VendorService";
import { AlertError, AlertSuccess } from "../components/shared/Alert";
import { extractStringToArray } from "../utility/Util";

const firebaseConfig = {
    apiKey: "AIzaSyAZDGDzEUbd4sOG7L3QtgDJWT9TMlLUjoM",
    authDomain: "travelapp-53573.firebaseapp.com",
    projectId: "travelapp-53573",
    storageBucket: "travelapp-53573.appspot.com",
    messagingSenderId: "95275701065",
    appId: "1:95275701065:web:9ecfd81bc1c2c6a3cf4098",
    measurementId: "G-S9L2ZFQBSB",
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export default function Vendor({ navigation, route }) {
    const vendorUsername = route.params.username;

    const location = useSelector((state) => state.global.location);
    const loading = useSelector((state) => state.global.loading);

    const dispatch = useDispatch();

    let [vendorDetail, setVendorDetail] = useState({
        rating: 0,
        tags: "",
        rankingDetails: "",
        title: "",
        price: "",
        address: "",
        gettingThere: [],
        about: "",
        restaurantsNearby: [],
        attractionsNearby: [],
        amenitiesScreen: "",
        geoPoint: {
            latitude: "",
            longitude: "",
        },
        photos: [],
        reviews: {
            ratingValue: 5,
            content: [],
        },
    });

    const [uploaded, setUploaded] = useState({
        first: false,
        second: false,
        third: false,
        fourth: false,
    });

    const slides = [
        {
            key: 1,
        },
        {
            key: 2,
        },
        {
            key: 3,
        },
        {
            key: 4,
        },
    ];

    useLayoutEffect(() => {
        dispatch(setLoading(false));
    }, []);

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
                setVendorDetail({
                    ...vendorDetail,
                    geoPoint: {
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                    },
                });
            }
        }
    };

    function renderItem({ item }) {
        if (item.key == 1) {
            return (
                <SafeAreaView className="flex-1 w-full bg-white">
                    <ScrollView>
                        <View className="flex-1 w-[90%] mx-auto mt-10">
                            <Image
                                source={require("../assets/lottie/info.gif")}
                                resizeMode="contain"
                                className="h-[150px] w-full mx-auto"
                            />

                            <View className="my-3">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                    Enter a hotel name
                                </Text>
                                <TextInput
                                    placeholder="e.g. Hyaat Regency Hotel"
                                    className="border border-gray-300 rounded-xl px-4 py-3"
                                    value={vendorDetail.title}
                                    onChangeText={(value) =>
                                        setVendorDetail({
                                            ...vendorDetail,
                                            title: value,
                                        })
                                    }
                                />
                            </View>

                            <View className="my-3">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                    Enter your address
                                </Text>
                                <View className="relative">
                                    <TextInput
                                        placeholder="e.g. Sakhamaul, New Baneshwor"
                                        className="border border-gray-300 rounded-xl px-4 py-3"
                                        value={vendorDetail.address}
                                        onChangeText={(value) =>
                                            setVendorDetail({
                                                ...vendorDetail,
                                                address: value,
                                            })
                                        }
                                    />
                                </View>
                            </View>

                            <View className="my-3">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                    Provide some descriptions about your hotel !
                                </Text>
                                <View className="relative">
                                    <TextInput
                                        multiline
                                        numberOfLines={5}
                                        placeholder="e.g. About hotel..."
                                        style={{ textAlignVertical: "top" }}
                                        className="border border-gray-300 rounded-xl px-4 py-3"
                                        value={vendorDetail.about}
                                        onChangeText={(value) =>
                                            setVendorDetail({
                                                ...vendorDetail,
                                                about: value,
                                            })
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        } else if (item.key === 2) {
            return (
                <SafeAreaView className="flex-1 bg-white w-full">
                    <ScrollView>
                        <View className="flex-1 w-[90%] mx-auto mt-10">
                            <Image
                                source={require("../assets/lottie/info.gif")}
                                resizeMode="contain"
                                className="h-[150px] w-full mx-auto"
                            />

                            <View className="my-3">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                    How much do you charge per stay ?
                                </Text>
                                <View className="relative">
                                    <TextInput
                                        placeholder="e.g. Sakhamaul, New Baneshwor"
                                        className="border border-gray-300 rounded-xl px-4 py-3"
                                        value={vendorDetail.price}
                                        onChangeText={(value) =>
                                            setVendorDetail({
                                                ...vendorDetail,
                                                price: value,
                                            })
                                        }
                                    />
                                </View>
                            </View>

                            <View className="my-3">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                    What facilities do you provide ?
                                </Text>
                                <View className="relative">
                                    <TextInput
                                        multiline
                                        numberOfLines={4}
                                        style={{ textAlignVertical: "top" }}
                                        placeholder="e.g. Free Parking, Free Wifi"
                                        className="border border-gray-300 rounded-xl px-4 py-3"
                                        value={vendorDetail.amenitiesScreen}
                                        onChangeText={(value) =>
                                            setVendorDetail({
                                                ...vendorDetail,
                                                amenitiesScreen: value,
                                            })
                                        }
                                    />
                                </View>
                            </View>

                            <View className="my-3">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                    Add tags for better search !
                                </Text>
                                <View className="relative">
                                    <TextInput
                                        multiline
                                        numberOfLines={4}
                                        style={{ textAlignVertical: "top" }}
                                        placeholder="e.g. Charming, Romantic, Classic, Great View"
                                        className="border border-gray-300 rounded-xl px-4 py-3"
                                        value={vendorDetail.tags}
                                        onChangeText={(value) =>
                                            setVendorDetail({
                                                ...vendorDetail,
                                                tags: value,
                                            })
                                        }
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            );
        } else if (item.key === 3) {
            return (
                <SafeAreaView className="bg-white flex-1">
                    <View className="flex-1 w-[90%] mx-auto mt-10">
                        <Image
                            source={require("../assets/lottie/photos.gif")}
                            resizeMode="contain"
                            className="h-[200px] w-full mx-auto"
                        />

                        <Text className="text-center font-[BalooBold] text-2xl">
                            Add some photos in your collection
                        </Text>

                        {loading ? (
                            <View className="flex-1 my-[100px]">
                                <ActivityIndicator size={"large"} />
                            </View>
                        ) : (
                            <View className="flex-row flex-wrap justify-between mt-8">
                                {uploaded.first ? (
                                    <TouchableOpacity>
                                        <View className="border-4 border-green-500 px-2 w-[100px] h-[100px] items-center justify-center">
                                            <AntDesign
                                                name="checkcircle"
                                                size={24}
                                                color="#00ba00"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => pickImage("first")}
                                    >
                                        <View className="border-4 border-gray-500 px-2 w-[100px] h-[100px] items-center justify-center">
                                            <FontAwesome5
                                                name="plus"
                                                size={24}
                                                color="black"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}

                                {uploaded.second ? (
                                    <TouchableOpacity>
                                        <View className="border-4 border-green-500 px-2 w-[100px] h-[100px] items-center justify-center">
                                            <AntDesign
                                                name="checkcircle"
                                                size={24}
                                                color="#00ba00"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => pickImage("second")}
                                    >
                                        <View className="border-4 border-gray-500 px-2 w-[100px] h-[100px] items-center justify-center">
                                            <FontAwesome5
                                                name="plus"
                                                size={24}
                                                color="black"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}

                                {uploaded.third ? (
                                    <TouchableOpacity>
                                        <View className="border-4 border-green-500 px-2 w-[100px] h-[100px] items-center justify-center">
                                            <AntDesign
                                                name="checkcircle"
                                                size={24}
                                                color="#00ba00"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => pickImage("third")}
                                    >
                                        <View className="border-4 border-gray-500 px-2 w-[100px] h-[100px] items-center justify-center">
                                            <FontAwesome5
                                                name="plus"
                                                size={24}
                                                color="black"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}

                                {uploaded.fourth ? (
                                    <TouchableOpacity>
                                        <View className="border-4 border-green-500 px-2 w-[100px] h-[100px] items-center justify-center my-8">
                                            <AntDesign
                                                name="checkcircle"
                                                size={24}
                                                color="#00ba00"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => pickImage("fourth")}
                                    >
                                        <View className="border-4 border-gray-500 px-2 w-[100px] h-[100px] items-center justify-center my-8">
                                            <FontAwesome5
                                                name="plus"
                                                size={24}
                                                color="black"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        )}
                    </View>
                </SafeAreaView>
            );
        } else {
            requestLocationPermissionHandler();
            return (
                <SafeAreaView className="flex-1 items-center justify-center bg-white">
                    <View>
                        <Image
                            source={require("../assets/lottie/check.gif")}
                            className="w-[200px] h-[200px] mx-auto"
                            resizeMode="contain"
                        />
                        <Text className="font-[BalooBold] text-3xl leading-10 my-5">
                            You are all set to go!
                        </Text>
                    </View>
                </SafeAreaView>
            );
        }
    }

    const renderNextButton = () => {
        return (
            <View className="bg-blue-600 px-3 py-3 rounded-full">
                <Entypo name="arrow-long-right" size={22} color="white" />
            </View>
        );
    };

    const renderPrevButton = () => {
        return (
            <View className="bg-blue-600 px-3 py-3 rounded-full">
                <Entypo name="arrow-long-left" size={22} color="white" />
            </View>
        );
    };

    const renderDoneButton = () => {
        return (
            <View className="bg-blue-600 px-3 py-3 rounded-full">
                <Entypo name="check" size={24} color="white" />
            </View>
        );
    };

    const pickImage = async (number) => {
        dispatch(setLoading(true));

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleImagePicked(result, number);
        }
    };

    const handleImagePicked = async (pickerResult, number) => {
        try {
            if (!pickerResult.cancelled) {
                const url = await uploadImageAsync(pickerResult.uri);
                if (url) {
                    let newPhotos = [...vendorDetail.photos, url];
                    setVendorDetail({
                        ...vendorDetail,
                        photos: newPhotos,
                    });
                    setUploaded({ ...uploaded, [number]: true });
                    dispatch(setLoading(false));
                }
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
            dispatch(setLoading(false));
        }
    };

    async function uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });

        const fileRef = ref(getStorage(), makeid(10));
        const result = await uploadBytes(fileRef, blob);

        // We're done with the blob, close and release it
        blob.close();

        const url = await getDownloadURL(fileRef);
        if (url) return url;
    }

    function makeid(length) {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
            counter += 1;
        }
        return result;
    }

    async function addHotel() {
        try {
            const newAmenitiesScreen = extractStringToArray(
                vendorDetail.amenitiesScreen
            );
            console.log(newAmenitiesScreen);
            const newTags = extractStringToArray(vendorDetail.tags);
            console.log(newTags);

            const newDetail = { ...vendorDetail };
            newDetail.amenitiesScreen = newAmenitiesScreen;
            newDetail.tags = newTags;

            const response = await indexHotelDetails(
                {
                    ...newDetail,
                    amenitiesScreen: newAmenitiesScreen,
                    tags: newTags,
                },
                vendorUsername
            );
            if (response) {
                dispatch(setSuccess("Hotel added successfully"));
                navigation.navigate("progress");
            }
        } catch (error) {
            dispatch(setError("Sorry, cannot add hotel right now"));
        }
    }

    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            renderNextButton={renderNextButton}
            renderPrevButton={renderPrevButton}
            renderDoneButton={renderDoneButton}
            onDone={addHotel}
        />
    );
}
