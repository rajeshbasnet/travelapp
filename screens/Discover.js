import {
    View,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../components/shared/Search";
import { useDispatch, useSelector } from "react-redux";
import { hideAutoComplete } from "../redux/locationAutoCompleteSlice";
import PopularPlace from "../components/discover/PopularPlace";
import TravelPlannnings from "../components/discover/TravelPlannnings";
import { TouchableOpacity } from "react-native";
import { getUserFromToken } from "../services/AuthService";
import ChatbotIcon from "../components/shared/ChatbotIcon";

const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/travelapp-53573.appspot.com/o/pngwing.com.png?alt=media&token=824daaf6-8cfa-45e7-af8c-e1f7a43690b8";

export default function Discover({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const [firstname, setFirstname] = useState("");
    const [uri, setUri] = useState("");

    function hideAutoCompleteAndKeyBoard() {
        dispatch(hideAutoComplete());
        Keyboard.dismiss();
    }

    async function fetchFirstname() {
        const user = await getUserFromToken(token);
        setFirstname(user.firstname);
        setUri(user.uri);
    }

    useEffect(() => {
        fetchFirstname();
    }, []);

    return (
        <TouchableWithoutFeedback onPress={hideAutoCompleteAndKeyBoard}>
            <SafeAreaView className="flex-1 bg-[#F4F5FF] relative">
                <View className="mx-4 mt-4 h-[100%]">
                    {/** User Information Component */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate("profile")}
                    >
                        <View className="flex flex-row items-center">
                            <Image
                                src={uri}
                                resizeMode="contain"
                                className="w-8 h-8 rounded-full"
                            />
                            <Text className="font-[BalooMedium] tracking-tight ml-3 text-[15px] text-[#3D3D3F]">
                                Hello, {firstname && firstname}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/** Header Text */}
                    <View className="mt-8">
                        <Text className="text-3xl font-[BalooExtrabold] text-[#3D3D3F] tracking-wide">
                            Let's travel
                        </Text>
                        <Text className="text-3xl font-[BalooExtrabold] text-[#3D3D3F] tracking-wide">
                            Now
                        </Text>
                    </View>

                    {/** Search Container */}
                    <Search navigation={navigation} />

                    {/** Travel Plannings */}
                    <TravelPlannnings navigation={navigation} />

                    {/** Popular Places */}
                    <PopularPlace navigation={navigation} />

                    {/** Chatbot Icons */}
                    <ChatbotIcon navigation={navigation} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
