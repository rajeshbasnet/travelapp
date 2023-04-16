import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import Register from '../Register';
import Discover from '../Discover';
import Places from '../Places';
import Detail from '../Detail';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, statusBarHidden: true}}>
      {/* <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} /> */}
      <Stack.Screen name="discover" component={Discover} />
      <Stack.Screen name="places" component={Places} />
      <Stack.Screen name="detail" component={Detail} />
      {/* 
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="attraction_detail" component={AttractionDetails} />
            <Stack.Screen name="attraction" component={Attractions} />
            <Stack.Screen name="places_list" component={PlacesList} /> */}
    </Stack.Navigator>
  );
}
