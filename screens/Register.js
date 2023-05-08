import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo, Feather } from "@expo/vector-icons";
import { registerUser } from "../services/AuthService";
import { Keyboard } from "react-native";
import { AlertError, AlertSuccess } from "../components/shared/Alert";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setError, setSuccess } from "../redux/globalSlice";
import { USER } from "../constants/GlobalConstants";

export default function Register({ navigation, route }) {
    const { role } = route.params;

    const scrollRef = useRef();
    const success = useSelector((state) => state.global.success);
    const error = useSelector((state) => state.global.error);

    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        number: "",
    });

    async function registerUserHandler() {
        scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
        });

        Keyboard.dismiss();
        setUserInfo({
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            number: "",
            role,
        });

        try {
            const message = await registerUser(userInfo);
            if (message) {
                dispatch(setSuccess(message));
                setTimeout(() => {
                    dispatch(setSuccess(""));
                }, 1500);

                setTimeout(() => {
                    if (role == USER) {
                        navigation.navigate("login");
                    } else {
                        navigation.navigate("intro_slider");
                    }
                }, 2000);
            }
        } catch (error) {
            dispatch(setError("Cannot register user with given email address"));
            setTimeout(() => {
                dispatch(setError(""));
            }, 2000);
        }
    }

    return (
        <ScrollView ref={scrollRef}>
            <SafeAreaView className="flex-1 justify-center bg-white py-8">
                {error && <AlertError message={error} />}
                {success && <AlertSuccess message={success} />}
                <View className="mx-6">
                    {/** Login Header */}
                    <View>
                        <Text className="font-[BalooBold] text-3xl leading-10 text-center">
                            Go Travel
                        </Text>
                        <Text className="text-lg tracking-tight text-center font-[SansMedium]">
                            Travel without limits
                        </Text>
                    </View>

                    {/** Login Input */}
                    <View className="mt-8">
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
                                    value={userInfo.password}
                                    onChangeText={(value) =>
                                        setUserInfo({
                                            ...userInfo,
                                            password: value,
                                        })
                                    }
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

                        {/** Terms and Conditions */}
                        <View className="flex-row items-center my-2">
                            <BouncyCheckbox
                                disableText={false}
                                size={20}
                                isChecked={true}
                            />
                            <Text className="font-[SansMedium] tracking-tight text-sm">
                                I hereby agree all the terms and conditions.
                            </Text>
                        </View>
                    </View>

                    {/** Register Container */}
                    <View>
                        {/** Rgister Button */}
                        <TouchableOpacity onPress={registerUserHandler}>
                            <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                                <Text className="text-[15px] text-center font-[SansMedium]">
                                    Continue
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
                            <Text className="text-md text-gray-400 my-4 mx-4 text-center">
                                or
                            </Text>
                            <View className="bg-gray-200 h-[1px] flex-1"></View>
                        </View>

                        {/** Register Button */}
                        <TouchableOpacity onPress={() => navigation.popToTop()}>
                            <View className="border border-gray-300 rounded-3xl px-4 py-4">
                                <Text className="text-md tracking text-center font-[SansMedium]">
                                    Login with GoTravel
                                </Text>
                                <View className="absolute left-2 top-[70%]">
                                    <Entypo
                                        name="chevron-left"
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
