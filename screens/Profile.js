import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { UserProfile } from "../assets/images";

export default function Profile({ navigation }) {
    return (
        <ScrollView>
            <SafeAreaView className="flex-1 mx-4">
                <View className="my-2 flex flex-row items-center justify-between px-1 py-1">
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <View className="bg-slate-300 px-2 py-2 rounded-full">
                            <FontAwesome5
                                name="chevron-circle-left"
                                size={20}
                                color="#555cac"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
                <View className="items-center">
                    <Image
                        source={UserProfile}
                        className="items-center justify-center bg-gray-300 w-[120px] h-[120px] rounded-full"
                        resizeMode="contain"
                    />
                    <TouchableOpacity>
                        <View className="mt-4 bg-blue-200 rounded-3xl px-4 py-4 items-start justify-between flex-row">
                            <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
                                Upload your photo
                            </Text>
                            <Entypo
                                name="chevron-right"
                                size={22}
                                color="black"
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/** Email Address Field */}
                <View className="my-2">
                    <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
                        Your email address
                    </Text>
                    <TextInput
                        placeholder="travel@gmail.com"
                        className="border border-gray-300 rounded-3xl px-4 py-3"
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
                            className="border border-gray-300 rounded-3xl px-4 py-3"
                        />
                    </View>
                </View>

                <TouchableOpacity>
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

                {/** User Information */}
                <View></View>
            </SafeAreaView>
        </ScrollView>
    );
}
