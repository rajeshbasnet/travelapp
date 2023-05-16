import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    AntDesign,
    Entypo,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { UserProfile } from "../assets/images";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserFromToken,
    getUserFromUsername,
    isUser,
    isVendor,
    updateUser,
    updateUserWithoutPWChange,
} from "../services/AuthService";
import { AlertError, AlertSuccess } from "../components/shared/Alert";
import { setToken } from "../redux/authSlice";
import * as ImagePicker from "expo-image-picker";
import { getApps, initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../components/shared/Header";
import { setError, setSuccess } from "../redux/globalSlice";

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

const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/travelapp-53573.appspot.com/o/pngwing.com.png?alt=media&token=824daaf6-8cfa-45e7-af8c-e1f7a43690b8";

export default function Profile({ navigation }) {
    let token = useSelector((state) => state.auth.token);
    let success = useSelector((state) => state.global.success);
    let error = useSelector((state) => state.global.error);

    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        username: "",
        number: "",
    });
    const [password, setPassword] = useState("");

    async function fetchUser() {
        if (token) {
            const decodedValue = jwt_decode(token);
            const { sub } = decodedValue;
            const user = await getUserFromUsername(sub);
            user && setUserInfo(user);
        }
    }

    async function updateUserInfo() {
        try {
            const response = await updateUser(userInfo._id, {
                ...updateUser,
                password,
            });
            dispatch(setSuccess(response?.message));

            setTimeout(() => {
                dispatch(setToken(""));
                dispatch(setSuccess(""));
                navigation.navigate("login");
            }, 2000);
        } catch (error) {
            dispatch(setError("Sorry, we cannot update user"));
        }
    }

    const pickImage = async () => {
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

    const updateUserImage = async (uri) => {
        try {
            const user = await getUserFromToken(token);

            if (user) {
                const response = await updateUserWithoutPWChange(user._id, {
                    ...user,
                    uri,
                });
                dispatch(setSuccess(response?.message));

                setTimeout(() => {
                    dispatch(setSuccess(""));
                    navigation.navigate("discover");
                }, 1000);
            }
        } catch (error) {
            dispatch(setError("Sorry, we cannot update user"));
        }
    };

    const handleImagePicked = async (pickerResult) => {
        try {
            if (!pickerResult.cancelled) {
                const url = await uploadImageAsync(pickerResult.uri);
                if (url) {
                    await updateUserImage(url);
                }
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

    function logoutUser() {
        dispatch(setToken(""));
        dispatch(setSuccess("You have been logged out successfully"));
        navigation.navigate("login");
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <ScrollView className="bg-[#F4F5FF] w-full h-full">
            {/** Header Component */}
            <View className="mx-2 my-2 flex flex-row items-center justify-between px-1 py-1">
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Ionicons name="ios-arrow-back" size={30} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={logoutUser}>
                    <MaterialCommunityIcons
                        name="logout"
                        size={24}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            {/** Profile Body Component*/}
            <SafeAreaView className="flex-1 mx-4 pb-4">
                {error && <AlertError message={error} />}
                {success && <AlertSuccess message={success} />}
                <View className="items-center">
                    <Image
                        src={userInfo.uri || defaultImage}
                        className="items-center justify-center bg-gray-300 w-[120px] h-[120px] rounded-full"
                        resizeMode="contain"
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <View className="mt-3 mb-2 bg-[#428af5] rounded-3xl px-3 py-3 items-start justify-between flex-row ">
                            <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center text-white">
                                Update Your Image
                            </Text>
                            <Entypo
                                name="chevron-right"
                                size={22}
                                color="white"
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between items-center">
                    {/** Firstname Field */}
                    <View className="my-2 flex-1 mr-1">
                        <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                            Firstname
                        </Text>
                        <TextInput
                            placeholder="e.g.Dennis"
                            className="border border-gray-300 rounded-lg px-4 py-3"
                            value={userInfo.firstname}
                            onChangeText={(value) =>
                                setUserInfo({
                                    ...userInfo,
                                    firstname: value,
                                })
                            }
                        />
                    </View>

                    {/** Lastname Field */}
                    <View className="my-2 flex-1 ml-1">
                        <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                            Lastname
                        </Text>
                        <TextInput
                            placeholder="e.g.Dennis"
                            className="border border-gray-300 rounded-lg px-4 py-3"
                            value={userInfo.lastname}
                            onChangeText={(value) =>
                                setUserInfo({
                                    ...userInfo,
                                    lastname: value,
                                })
                            }
                        />
                    </View>
                </View>

                {/** Email Address Field */}
                <View className="my-2">
                    <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                        Your email address
                    </Text>
                    <TextInput
                        placeholder="travel@gmail.com"
                        className="border border-gray-300 rounded-lg px-4 py-3"
                        value={userInfo.username}
                        onChangeText={(value) =>
                            setUserInfo({
                                ...userInfo,
                                username: value,
                            })
                        }
                    />
                </View>

                {/** Password Field */}
                <View className="my-2">
                    <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                        Choose a password
                    </Text>
                    <View className="relative">
                        <TextInput
                            secureTextEntry
                            placeholder="min. 8 characters"
                            className="border border-gray-300 rounded-lg px-4 py-3"
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                        />
                    </View>
                </View>

                {/** Phone Number Field */}
                <View className="my-2">
                    <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                        Enter your number
                    </Text>
                    <View className="relative">
                        <TextInput
                            keyboardType="numeric"
                            placeholder="eq. 10 numbers required"
                            className="border border-gray-300 rounded-lg px-4 py-3"
                            value={userInfo.number}
                            onChangeText={(value) =>
                                setUserInfo({
                                    ...userInfo,
                                    number: value,
                                })
                            }
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={updateUserInfo}>
                    <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                        <Text className="text-[15px] text-center font-[SansMedium]">
                            Update your profile
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

                {isVendor(token) ? (
                    <View className="bg-[#555cac] w-[150px] rounded-[50px] py-5 flex-row items-center justify-center mx-auto fixed top-[6%] mb-6">
                        <TouchableOpacity
                            className="mr-5"
                            onPress={() => navigation.navigate("profile")}
                        >
                            <FontAwesome
                                name="user-circle-o"
                                size={24}
                                color="#FBA401"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="ml-5"
                            onPress={() => navigation.navigate("dashboard")}
                        >
                            <AntDesign
                                name="infocirlce"
                                size={24}
                                color={"#FBA401"}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <></>
                )}
            </SafeAreaView>
        </ScrollView>
    );
}
