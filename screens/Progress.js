import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { setError, setSuccess } from "../redux/globalSlice";

export default function Progress({ navigation }) {
    let success = useSelector((state) => state.global.success);
    let error = useSelector((state) => state.global.error);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(setSuccess(""));
                navigation.navigate("discover");
            }, 1500);
        }

        if (error) {
            setTimeout(() => {
                dispatch(setError(""));
                navigation.navigate("discover");
            }, 1500);
        }
    }, [success, error]);

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            {success ? (
                <>
                    <Image
                        source={require("../assets/lottie/check.gif")}
                        className="w-[200px] h-[200px] mx-auto"
                        resizeMode="contain"
                    />
                    <Text className="font-[SansMedium] text-lg text-gray-800">
                        Hotel details added successfully
                    </Text>
                </>
            ) : (
                <>
                    <Image
                        source={require("../assets/lottie/progress.gif")}
                        className="w-[200px] h-[200] mx-auto"
                        resizeMode="contain"
                    />
                    <Text className="font-[SansMedium] text-lg text-gray-800">
                        Your Request Is In Progress
                    </Text>
                </>
            )}
        </SafeAreaView>
    );
}
