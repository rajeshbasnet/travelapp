import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Attraction, Hotel, Resturant} from '../../assets/images';

export default function TravelPlannnings({navigation}) {
  return (
    <View className="mt-6 z-[-1]">
      <Text className="font-[BalooExtrabold] text-xl">Travel Plannings</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.navigate('places')}>
          <View className="relative w-[300px] h-[150px]">
            <View className="w-full h-full">
              <ImageBackground
                key={'hotel'}
                source={Hotel}
                className="w-full h-full rounded-3xl overflow-hidden"
                resizeMode="cover"
              />
              <View
                className="absolute w-full h-full rounded-3xl"
                style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}></View>
            </View>
            <View className="absolute bottom-1 left-6">
              <Text className="font-[BalooExtrabold] text-xl text-white">
                Hotels
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="relative w-[300px] h-[150px] ml-4">
          <View className="w-full h-full">
            <ImageBackground
              key={'resturant'}
              source={Resturant}
              className="w-full h-full rounded-3xl overflow-hidden"
              resizeMode="cover"
            />
            <View
              className="absolute w-full h-full rounded-3xl"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}></View>
          </View>
          <View className="absolute bottom-1 left-6">
            <Text className="font-[BalooExtrabold] text-xl text-white">
              Restaurants
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="relative w-[300px] h-[150px] ml-4"
          onPress={() => navigation.navigate('attraction')}>
          <View className="w-full h-full">
            <ImageBackground
              key={'attraction'}
              source={Attraction}
              className="w-full h-full rounded-3xl overflow-hidden"
              resizeMode="cover"
            />
            <View
              className="absolute w-full h-full rounded-3xl"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.3)'}}></View>
          </View>
          <View className="absolute bottom-1 left-6">
            <Text className="font-[BalooExtrabold] text-xl text-white">
              Attractions
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
