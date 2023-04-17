import {
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {
  fetchXID,
  getAttractionDetail,
  getAttractionDetails,
  getAttractions,
} from '../../services/DiscoverService';
import {setAttractions} from '../../redux/placeSlice';
import {TouchableOpacity, PermissionsAndroid} from 'react-native';
import {setLoading, setLocation} from '../../redux/globalSlice';
import AppLoading from '../loading/AppLoading';
import Geolocation from 'react-native-geolocation-service';

export default function PopularPlace() {
  const dispatch = useDispatch();
  const popularPlaces = useSelector(state => state.place.attractions);
  const location = useSelector(state => state.global.location);
  const loading = useSelector(state => state.global.loading);

  const attractionDetailsHandler = async () => {
    const attractionDetailList = [];
    const attractions = await getAttractions(
      location?.coords?.latitude || 27.708317,
      location?.coords?.longitude || 85.3205817,
    );
    const ids = await fetchXID(attractions);

    for (let i = 0; i < ids.length; i++) {
      const detail = await getAttractionDetail(ids[i]);
      attractionDetailList.push(detail);
    }

    dispatch(setAttractions(attractionDetailList));
    dispatch(setLoading(false));
  };

  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          dispatch(setLocation(position));
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
          setLocation(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  useLayoutEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location?.coords?.latitude) {
      attractionDetailsHandler();
    }
  }, [location]);

  return (
    <View className="mt-6 flex-1">
      <View className="flex flex-row items-start justify-between">
        <Text className="font-[BalooBold] text-xl">Popular Place</Text>
      </View>

      {loading ? (
        <AppLoading />
      ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {popularPlaces &&
            [...popularPlaces].splice(1, 5).map(place => {
              const {name, country, road, source} = place;
              return (
                <TouchableOpacity>
                  <View
                    key={place.id}
                    className="px-2 py-2 mx-2 my-2 w-[260px] overflow-x-hidden h-32 rounded-xl flex flex-row items-center bg-white"
                    style={{
                      elevation: 1000,
                      shadowRadius: 10,
                      shadowColor: '#4A5AFC',
                      shadowOffset: [-50, -50],
                    }}>
                    <View className="flex-1">
                      <Image
                        source={{uri: source}}
                        className="w-24 h-full rounded-xl"
                        resizeMode="cover"
                      />
                    </View>
                    <View className="flex-[1.5] ml-4">
                      <Text className="font-[BalooBold] text-md">{name}</Text>
                      <Text className="font-[BalooMedium] text-[12px] text-gray-400">
                        {country}
                      </Text>
                      <Text className="font-[BalooMedium] text-[12px] text-gray-400">
                        {road}
                      </Text>
                      <Text className="text-[#2DAFBC] text-[12px]">
                        See Details
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
}
