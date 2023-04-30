import {
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import LocationAutoComplete from "./LocationAutoComplete";
import { useDispatch, useSelector } from "react-redux";
import {
    setLocation,
    showAutoComplete,
} from "../../redux/locationAutoCompleteSlice";
import { getLocationData } from "../../services/DiscoverService";
import { setLoading } from "../../redux/globalSlice";

export default function Search({ navigation }) {
    const [searchLocationQuery, setSearchLocationQuery] = useState("");

    const dispatch = useDispatch();
    const locations = useSelector((state) => state.location.locations);

    // Fetching location data
    useEffect(() => {
        getLocationData(searchLocationQuery)
            .then((response) => {
                dispatch(setLocation(response));
                dispatch(setLoading(false));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchLocationQuery]);

    return (
        <View className="mt-4 relative">
            <TextInput
                className="font-[SansMedium] px-4 py-3 border rounded-3xl border-gray-300 text-md"
                placeholder="Search Location"
                value={searchLocationQuery}
                onFocus={() => dispatch(showAutoComplete())}
                onChangeText={(value) => setSearchLocationQuery(value)}
            />
            <View className="absolute right-4 top-[25%] flex-row">
                <Feather name="search" size={24} color="#BABBC1" />
            </View>

            {/** Search Autocomplete */}
            <LocationAutoComplete
                locations={locations}
                setSearchLocationQuery={setSearchLocationQuery}
                navigation={navigation}
            />
        </View>
    );
}
