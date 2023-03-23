import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./configs/StackNavigator";

export default function App() {
    return (
        <NavigationContainer>
            <StackNavigator></StackNavigator>
        </NavigationContainer>
    );
}
