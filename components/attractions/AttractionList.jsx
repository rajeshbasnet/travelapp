import {View, Text, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

export default function AttractionList({place, navigation}) {
  const {xid, name, country, road, source} = place;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('attraction_detail', {xid})}>
      <View className="px-2 py-2 mx-2 my-4 h-32 rounded-xl flex flex-row items-center bg-white relative">
        {/** Hotel Image */}
        <View>
          <Image
            src={source}
            className="w-24 h-full rounded-xl"
            resizeMode="cover"
          />
        </View>

        {/** Hotel Information */}
        <View className="ml-4">
          <View className="w-[210px] overflow-hidden">
            <Text className="font-[BalooBold] text-lg">{name}</Text>
            <Text className="mb-2 font-[BalooMedium] text-md text-gray-400">
              {country},&nbsp;{road || 'Nepal'}
            </Text>
            <View className="flex-row items-baseline">
              <AntDesign name="star" size={15} color="#F5D04A" />
              <Text className="text-gray-400 font-[BalooBold] text-lg ml-1">
                3
              </Text>
            </View>
          </View>
        </View>

        {/** Detail navigate icon */}
        <View className="absolute right-3 bg-slate-100 px-1 py-1 rounded-full">
          <MaterialCommunityIcons name="share" size={24} color="#555cac" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
