import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { authenticateUser } from "../services/AuthService";
import { AlertError, AlertSuccess } from "../components/shared/Alert";
import { Keyboard } from "react-native";

export default function Login({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function authenticateUserHandler() {
        try {
            const token = await authenticateUser(username, password);
            setSuccess("Login Successfull");
            setTimeout(() => {
                setSuccess("");
            }, 2000);

            if (token) {
                setTimeout(() => {
                    navigation.navigate("discover");
                }, 2000);
            }
        } catch (error) {
            setError("Cannot find user from given username.");
            setTimeout(() => {
                setError("");
            }, 2000);
        }

        Keyboard.dismiss();
        setUsername("");
        setPassword("");
    }

    return (
        <>
            <SafeAreaView className="flex-1 justify-center bg-white">
                {error && <AlertError message={error} />}
                {success && <AlertSuccess message={success} />}

                <View className="mx-6">
                    {/** Login Header */}
                    <View>
                        <Text className="font-[BalooBold] text-3xl leading-10 text-center">
                            Go Travel
                        </Text>
                        <Text className="font-[SansMedium] text-lg tracking-tight text-center">
                            Travel without limits
                        </Text>
                    </View>

                    {/** Login Input */}
                    <View className="mt-12">
                        <View className="my-3">
                            <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                Your email address
                            </Text>
                            <TextInput
                                placeholder="travel@gmail.com"
                                className="border border-gray-300 rounded-3xl px-4 py-3"
                                value={username}
                                onChangeText={(value) => setUsername(value)}
                            />
                        </View>
                        <View className="my-3">
                            <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                Choose a password
                            </Text>
                            <View className="relative">
                                <TextInput
                                    textContentType="password"
                                    placeholder="min. 8 characters"
                                    className="border border-gray-300 rounded-3xl px-4 py-3"
                                    value={password}
                                    onChangeText={(value) => setPassword(value)}
                                />
                                <View className="absolute right-2 bottom-[25%]">
                                    <Feather
                                        name="eye"
                                        size={22}
                                        color="#c2c1be"
                                    />
                                    {/* <Feather name="eye-off" size={22} color="#c2c1be" /> */}
                                </View>
                            </View>
                        </View>
                    </View>

                    {/** Login Container */}
                    <View>
                        {/** Login Button */}
                        <TouchableOpacity onPress={authenticateUserHandler}>
                            <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                                <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
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
                        <View className="flex-row items-center my-4">
                            <View className="bg-gray-200 h-[1px] flex-1"></View>
                            <Text className="font-[SansMedium] text-md text-gray-400 my-5 mx-4 text-center">
                                or
                            </Text>
                            <View className="bg-gray-200 h-[1px] flex-1"></View>
                        </View>

                        {/** Register Button */}
                        <TouchableOpacity
                            onPress={() => navigation.navigate("register")}
                        >
                            <View className="border border-gray-300 rounded-3xl px-4 py-4">
                                <Text className="font-[SansMedium] text-md tracking text-center">
                                    Sign up with GoTravel
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
                </View>
            </SafeAreaView>
        </>
    );
}
