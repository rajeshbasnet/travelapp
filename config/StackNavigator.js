import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Detail from "../screens/Detail";
import Discover from "../screens/Discover";
import Places from "../screens/Places";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Splash from "../screens/Splash";
import Attractions from "../screens/Attractions";
import AttractionDetails from "../screens/AttractionDetails";
import PlacesList from "../screens/PlacesList";
import Chatbot from "../screens/Chatbot";
import Profile from "../screens/Profile";
import Test from "../screens/Test";
import Vendor from "../screens/Vendor";
import Question from "../screens/Question";
import Progress from "../screens/Progress";
import Dashboard from "../screens/Dashboard";
import Information from "../screens/vendor/Information";
import HotelDetail from "../screens/vendor/HotelDetail";
import ImageCollection from "../screens/vendor/ImageCollection";
import AllSet from "../screens/vendor/AllSet";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false, statusBarHidden: true }}
        >
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="dashboard" component={Dashboard} />
            <Stack.Screen name="progress" component={Progress} />
            <Stack.Screen name="question" component={Question} />
            <Stack.Screen name="test" component={Test} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="discover" component={Discover} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="chatbot" component={Chatbot} />
            <Stack.Screen name="places" component={Places} />
            <Stack.Screen name="detail" component={Detail} />
            <Stack.Screen
                name="attraction_detail"
                component={AttractionDetails}
            />
            <Stack.Screen name="attraction" component={Attractions} />
            <Stack.Screen name="places_list" component={PlacesList} />
            <Stack.Screen name="information" component={Information} />
            <Stack.Screen name="hotel_detail" component={HotelDetail} />
            <Stack.Screen name="image_collection" component={ImageCollection} />
            <Stack.Screen name="all_set" component={AllSet} />
        </Stack.Navigator>
    );
}
