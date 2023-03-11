import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import Discover from "../screens/Discover";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Discover" component={Discover} />
        </Stack.Navigator>
    );
}
