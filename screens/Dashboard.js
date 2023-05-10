import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setLoading, setSuccess } from "../redux/globalSlice";
import {
    getHotelDetailsFromUsername,
    updateHotelDetails,
} from "../services/DetailService";
import { SafeAreaView } from "react-native-safe-area-context";
import jwt_decode from "jwt-decode";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AlertError, AlertSuccess } from "../components/shared/Alert";

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

export default function Dashboard({ navigation }) {
    const [hotelDetails, setHotelDetails] = useState({});
    const [amenity, setAmenity] = useState("");
    const [tag, setTag] = useState("");

    let scrollRef = useRef();

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

    let token = useSelector((state) => state.auth.token);
    let loading = useSelector((state) => state.global.loading);
    let success = useSelector((state) => state.global.success);
    let error = useSelector((state) => state.global.error);

    let dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(setLoading(true));
    }, []);

    async function fetchHotelDetails() {
        if (token) {
            const { sub } = jwt_decode(token);
            const response = await getHotelDetailsFromUsername(sub);
            setHotelDetails(response);
            dispatch(setLoading(false));
        } else {
            dispatch(setLoading(false));
            navigation.navigate("login");
        }
    }

    const pickImage = async () => {
        dispatch(setLoading(true));

        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleImagePicked(result);
        }
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            if (!pickerResult.cancelled) {
                const url = await uploadImageAsync(pickerResult.uri);
                if (url) {
                    let newPhotos = [...hotelDetails.photos, url];
                    setHotelDetails({
                        ...hotelDetails,
                        photos: newPhotos,
                    });
                    console.log(hotelDetails.photos);
                    dispatch(setLoading(false));
                }
            } else {
                dispatch(setLoading(false));
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
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

    async function updateHotelDetail() {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });

        try {
            await updateHotelDetails(hotelDetails.id, hotelDetails);
            dispatch(setSuccess("Reviews added successfully"));

            setTimeout(() => {
                dispatch(setSuccess(""));
            }, 1000);
        } catch (error) {
            dispatch(setError("Try again later. Cannot update"));
            setTimeout(() => {
                dispatch(setError(""));
            }, 1000);
        }
    }

    function updateAmenities() {
        const newAmenities = [...hotelDetails.amenitiesScreen];
        newAmenities.push(amenity);
        setHotelDetails({
            ...hotelDetails,
            amenitiesScreen: newAmenities,
        });
        setAmenity("");
    }

    function updateTags() {
        const newTags = [...hotelDetails.tags];
        newTags.push(tag);
        setHotelDetails({
            ...hotelDetails,
            tags: newTags,
        });
        setAmenity("");
    }

    useEffect(() => {
        fetchHotelDetails();
    }, []);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size={"large"} />
            </SafeAreaView>
        );
    }

    return (
        <ScrollView className="flex-1 m-0 p-0" ref={scrollRef}>
            <SafeAreaView className="flex-1">
                {error && <AlertError message={error} />}
                {success && <AlertSuccess message={success} />}

                <View className="bg-blue-500">
                    <View className="absolute top-4 left-2 z-10">
                        <TouchableOpacity onPress={() => navigation.pop()}>
                            <Ionicons
                                name="ios-arrow-back"
                                size={30}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text className="font-[BalooBold] text-3xl text-center text-white leading-10 my-4">
                        Hotel Details
                    </Text>
                </View>

                <View className="flex-1 h-full rounded-t-xl overflow-hidden -top-3 bg-white relative px-4">
                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Your Hotel title
                        </Text>
                        <TextInput
                            placeholder="e.g. Hyaat Regency Hotel"
                            className="border border-gray-300 rounded-xl px-4 py-3"
                            value={title}
                            onChangeText={(value) =>
                                setHotelDetails({
                                    ...hotelDetails,
                                    title: value,
                                })
                            }
                        />
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Your hotel address
                        </Text>
                        <View className="relative">
                            <TextInput
                                placeholder="e.g. Sakhamaul, New Baneshwor"
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={address}
                                onChangeText={(value) =>
                                    setHotelDetails({
                                        ...hotelDetails,
                                        address: value,
                                    })
                                }
                            />
                        </View>
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Your hotel descriptions
                        </Text>
                        <View className="relative">
                            <TextInput
                                multiline
                                numberOfLines={5}
                                placeholder="e.g. About hotel..."
                                style={{ textAlignVertical: "top" }}
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={about}
                                onChangeText={(value) =>
                                    setHotelDetails({
                                        ...hotelDetails,
                                        about: value,
                                    })
                                }
                            />
                        </View>
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Your hotel price
                        </Text>
                        <View className="relative">
                            <TextInput
                                placeholder="e.g. Sakhamaul, New Baneshwor"
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={price}
                                onChangeText={(value) =>
                                    setHotelDetails({
                                        ...hotelDetails,
                                        price: value,
                                    })
                                }
                            />
                        </View>
                    </View>

                    <View className="my-3  px-2 pb-4 rounded-md">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            Your hotel facilities
                        </Text>
                        <View className="relative">
                            {amenitiesScreen &&
                                amenitiesScreen.map((item, index) => {
                                    return (
                                        <Text
                                            key={index}
                                            className="pl-2 font-[SansMedium] text-md"
                                        >
                                            {`\u2022 ${item}`}
                                        </Text>
                                    );
                                })}
                        </View>

                        {/** Add Facility Component */}
                        <View className="my-2 flex-row items-center">
                            <TextInput
                                placeholder="e.g Free Parking"
                                className="border border-gray-400 bg-slate-100 rounded-sm px-2 py-1 flex-1 mx-1"
                                value={amenity}
                                onChangeText={(value) => setAmenity(value)}
                            />
                            <TouchableOpacity onPress={updateAmenities}>
                                <View className="px-2 py-2 bg-blue-500 mx-1 rounded-sm">
                                    <Text className="text-white font-[SansMedium]">
                                        Add Facilities
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="px-2 pb-4 rounded-md">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10 ">
                            Add tags for better search !
                        </Text>
                        <View className="relative">
                            {tags &&
                                tags.map((item, index) => {
                                    return (
                                        <Text
                                            key={index}
                                            className="pl-2 font-[SansMedium] text-md"
                                        >
                                            {`\u2022 ${item}`}
                                        </Text>
                                    );
                                })}
                        </View>

                        {/** Add Tags Component */}
                        <View className="my-2 flex-row items-center">
                            <TextInput
                                placeholder="e.g Romantic"
                                className="border border-gray-400 bg-slate-100 rounded-sm px-2 py-1 flex-1 mx-1"
                                value={tag}
                                onChangeText={(value) => setTag(value)}
                            />
                            <TouchableOpacity onPress={updateTags}>
                                <View className="px-2 py-2 bg-blue-500 mx-1 rounded-sm">
                                    <Text className="text-white font-[SansMedium]">
                                        Add Tags
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="my-3">
                        <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                            List of your added images
                        </Text>
                        <View className="flex-row items-center flex-wrap justify-around">
                            {photos &&
                                photos.map((photo, index) => {
                                    return (
                                        <View key={index} className="my-0">
                                            <Image
                                                src={photo.trim()}
                                                className="w-[150px] h-[150px]"
                                                resizeMode="contain"
                                            />
                                        </View>
                                    );
                                })}

                            <TouchableOpacity onPress={pickImage}>
                                <View className="border-4 border-gray-500 w-[115px] h-[115px] items-center justify-center">
                                    <FontAwesome5
                                        name="plus"
                                        size={24}
                                        color="black"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity onPress={updateHotelDetail}>
                        <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                            <Text className="text-[15px] text-center font-[SansMedium]">
                                Update your details
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
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
