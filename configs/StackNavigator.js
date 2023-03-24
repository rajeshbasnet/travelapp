import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Discover from "../screens/Discover";
import Places from "../screens/Places";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="discover" component={Discover} />
            <Stack.Screen name="places" component={Places} />
            <Stack.Screen name="detail" component={Detail} />
        </Stack.Navigator>
    );
}
