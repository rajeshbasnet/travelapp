import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "./screens/config/StackNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator></StackNavigator>
        </NavigationContainer>
    );
}
