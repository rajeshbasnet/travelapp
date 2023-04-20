import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

export default function AppLoading() {
    return (
        <SafeAreaView className="flex-1 items-center mt-10">
            <ActivityIndicator size="large" color={"#A2FD7D"} />
        </SafeAreaView>
    );
}
