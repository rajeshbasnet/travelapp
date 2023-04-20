import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./config/StackNavigator";
import { Provider } from "react-redux";
import store from "./redux/store";
import React from "react";
import * as Font from "expo-font";

export default class App extends React.Component {
    state = {
        loaded: false,
    };

    componentDidMount() {
        this._loadAssetsAsync();
    }

    _loadAssetsAsync = async () => {
        await Font.loadAsync({
            BalooRegular: require("./assets/fonts/BalooRegular.ttf"),
            BalooMedium: require("./assets/fonts/BalooMedium.ttf"),
            BalooSemibold: require("./assets/fonts/BalooSemibold.ttf"),
            BalooBold: require("./assets/fonts/BalooBold.ttf"),
            BalooExtrabold: require("./assets/fonts/BalooExtrabold.ttf"),
            SansRegular: require("./assets/fonts/Roboto-Regular.ttf"),
            SansMedium: require("./assets/fonts/Roboto-Medium.ttf"),
            SansBold: require("./assets/fonts/Roboto-Bold.ttf"),
            SansThin: require("./assets/fonts/Roboto-Thin.ttf"),
        });
        this.setState({ loaded: true });
    };

    render() {
        if (!this.state.loaded) {
            return null;
        }

        return (
            <Provider store={store}>
                <NavigationContainer>
                    <StackNavigator></StackNavigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
