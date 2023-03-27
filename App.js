import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./configs/StackNavigator";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
    const [fontsLoaded] = useFonts({
        BalooRegular: require("./assets/fonts/BalooDa2-Regular.ttf"),
        BalooMedium: require("./assets/fonts/BalooDa2-Medium.ttf"),
        BalooSemibold: require("./assets/fonts/BalooDa2-SemiBold.ttf"),
        BalooBold: require("./assets/fonts/BalooDa2-Bold.ttf"),
        BalooExtrabold: require("./assets/fonts/BalooDa2-ExtraBold.ttf"),
    });

    return (
        <Provider store={store}>
            <NavigationContainer>
                <StackNavigator></StackNavigator>
            </NavigationContainer>
        </Provider>
    );
}
