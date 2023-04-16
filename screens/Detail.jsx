import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getHotelDetails} from '../services/DetailService';
import {replaceUrlWidthHeight} from '../utility/Util';
import {useDispatch, useSelector} from 'react-redux';
import {hideAbout, setAbout} from '../redux/detailSlice';
import {Linking} from 'react-native';

export default function Detail({route, navigation}) {
  const {id, urlTemplate} = route.params;

  const [hotelDetails, setHotelDetails] = useState({});
  const {
    rating,
    tags,
    rankingDetails,
    title,
    price,
    address,
    gettingThere,
    about,
    restaurantsNearby,
    attractionsNearby,
    amenitiesScreen,
    geoPoint,
    photos,
    reviews,
  } = hotelDetails;

  let showAbout = useSelector(state => state.detail.showAbout);
  let dispatch = useDispatch();

  let url = replaceUrlWidthHeight(urlTemplate, 400, 400);

  useLayoutEffect(() => {
    dispatch(hideAbout());
  }, []);

  useEffect(() => {
    getHotelDetails(id).then(detail => {
      setHotelDetails(detail);
    });
  }, []);

  function phoneCall() {
    Linking.openURL('tel:+977 9802331837');
  }

  return (
    <ScrollView>
      <SafeAreaView className="flex-1">
        <View className="relative">
          <View className="relative h-[260px]">
            <ImageBackground
              src={url}
              resizeMode="cover"
              className="w-full h-full"
            />
            <View
              className="absolute w-full h-full"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}></View>
          </View>
          <View className="mx-2 mt-2 absolute">
            <TouchableWithoutFeedback onPress={() => navigation.pop()}>
              <View className="px-2 py-2 rounded-full">
                <Ionicons
                  name="ios-arrow-undo-circle-outline"
                  size={28}
                  color="white"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View className="absolute bottom-[20%] mx-8">
            <Text className="font-[BalooBold] text-3xl text-white w-[300px] leading-10">
              {title}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-[BalooBold] text-md">
                {title}
              </Text>
              <Text className="text-white font-[BalooBold] text-md">
                {price}/Package
              </Text>
              <View className="flex-row items-baseline">
                <AntDesign name="star" size={15} color="#F5D04A" />
                <Text className="text-white font-[BalooBold] text-md ml-2">
                  {rating || 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="bg-[#F4F5FF] rounded-3xl bottom-10 h-full">
          <View className="mt-8 mx-4">
            <Text className="font-[BalooBold] text-xl text-gray-600">
              About
            </Text>
            <Text className="text-[12px] leading-5 text-gray-400 text-justify">
              {about && (showAbout ? about : about.slice(0, 150))}
              <TouchableWithoutFeedback onPress={() => dispatch(setAbout())}>
                <Text className="text-[#2DAFBC]">
                  &nbsp;&nbsp;
                  {about && showAbout ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableWithoutFeedback>
            </Text>
            <View className="my-4">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {photos &&
                  photos.map((photo, index) => {
                    const moreUrl = replaceUrlWidthHeight(
                      photo?.urlTemplate,
                      300,
                      300,
                    );
                    return (
                      <View className="mx-2 rounded-3xl" key={index}>
                        <Image
                          src={moreUrl}
                          className="w-[250px] h-[120px] rounded-xl"
                          resizeMode="cover"
                        />
                      </View>
                    );
                  })}
              </ScrollView>
            </View>

            <TouchableOpacity>
              <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
                  Book at ${price}
                </Text>
                <View className="absolute right-2 top-[70%]">
                  <Entypo name="chevron-right" size={22} color="black" />
                </View>
              </View>
            </TouchableOpacity>

            {/** Split */}
            <View className="flex-row items-center">
              <View className="bg-gray-200 h-[1px] flex-1"></View>
              <Text className="font-[SansMedium] text-md text-gray-400 my-2 mx-4 text-center">
                or
              </Text>
              <View className="bg-gray-200 h-[1px] flex-1"></View>
            </View>

            {/** Phone Call */}
            <TouchableOpacity onPress={phoneCall}>
              <View className="mt-2 bg-[#A2FD7D] rounded-3xl px-4 py-4">
                <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
                  Phone Call
                </Text>
                <View className="absolute right-2 top-[70%]">
                  <Entypo name="phone" size={22} color="black" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
