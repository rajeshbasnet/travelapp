import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setLoading } from "../../redux/globalSlice";
import { useLayoutEffect } from "react";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { setVendorDetail } from "../../redux/HotelSlice";

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

export default function ImageCollection({ navigation }) {
    const loading = useSelector((state) => state.global.loading);
    const vendorDetail = useSelector((state) => state.hotel.vendorDetail);

    const dispatch = useDispatch();

    const [uploaded, setUploaded] = useState({
        first: false,
        second: false,
        third: false,
        fourth: false,
    });

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
                    dispatch(
                        setVendorDetail({
                            ...vendorDetail,
                            photos: newPhotos,
                        })
                    );
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

    useLayoutEffect(() => {
        dispatch(setLoading(false));
    }, []);

    return (
        <ScrollView className="flex-1 bg-white">
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-1 w-[90%] mx-auto mt-10">
                    <Image
                        source={require("../../assets/lottie/photos.gif")}
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
                                        <FontAwesome
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

                    <TouchableOpacity
                        onPress={() => navigation.navigate("all_set")}
                    >
                        <View className="flex-row justify-end mt-2">
                            <View className=" bg-blue-500 px-2 py-2 w-[50px] h-[50px] items-center justify-center rounded-full">
                                <FontAwesome
                                    name="long-arrow-right"
                                    size={24}
                                    color="white"
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}
