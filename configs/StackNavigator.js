import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Discover from "../screens/Discover";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="discover" component={Discover} />
        </Stack.Navigator>
    );
}
