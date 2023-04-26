import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Entypo, Feather } from "@expo/vector-icons";
import { registerUser } from "../services/AuthService";
import { Keyboard } from "react-native";
import { AlertError, AlertSuccess } from "../components/shared/Alert";

export default function Register({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function registerUserHandler() {
        try {
            const message = await registerUser(username, password, number);
            setSuccess(message);
            setTimeout(() => {
                setSuccess("");
            }, 2000);

            if (token) {
                setTimeout(() => {
                    navigation.navigate("discover");
                }, 3000);
            }
        } catch (error) {
            setError("Cannot register user with given email address");
            setTimeout(() => {
                setError("");
            }, 2000);
        }

        Keyboard.dismiss();
        setUsername("");
        setPassword("");
        setNumber("");
    }

    return (
        <SafeAreaView className="flex-1 justify-center bg-white">
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
                    {/** Email Address Field */}
                    <View className="my-2">
                        <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                            Your email address
                        </Text>
                        <TextInput
                            placeholder="travel@gmail.com"
                            className="border border-gray-300 rounded-3xl px-4 py-3"
                            value={username}
                            onChangeText={(value) => setUsername(value)}
                        />
                    </View>

                    {/** Password Field */}
                    <View className="my-2">
                        <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                            Choose a password
                        </Text>
                        <View className="relative">
                            <TextInput
                                placeholder="min. 8 characters"
                                className="border border-gray-300 rounded-3xl px-4 py-3"
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                            />
                            <View className="absolute right-2 bottom-[25%]">
                                <Feather name="eye" size={22} color="#c2c1be" />
                                {/* <Feather name="eye-off" size={22} color="#c2c1be" /> */}
                            </View>
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
                                className="border border-gray-300 rounded-3xl px-4 py-3"
                                value={number}
                                onChangeText={(value) => setNumber(value)}
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
                    <TouchableOpacity onPress={() => navigation.pop()}>
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
    );
}
