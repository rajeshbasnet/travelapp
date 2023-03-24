import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./configs/StackNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

export default function App() {
    const [fontsLoaded] = useFonts({
        "baloo-bold": require("./assets/fonts/baloo/baloo-regular.ttf"),
        "baloo-medium": require("./assets/fonts/baloo/baloo-medium.ttf"),
        "baloo-semibold": require("./assets/fonts/baloo/baloo-semibold.ttf"),
        "baloo-bold": require("./assets/fonts/baloo/baloo-bold.ttf"),
        "baloo-extrabold": require("./assets/fonts/baloo/baloo-extrabold.ttf"),
    });

    return (
        <NavigationContainer>
            <StackNavigator></StackNavigator>
        </NavigationContainer>
    );
}
