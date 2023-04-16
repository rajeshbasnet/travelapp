import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Login({navigation}) {
  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <View className="mx-6">
        {/** Login Header */}
        <View>
          <Text className="font-[BalooBold] text-3xl leading-10 text-center">
            Go Travel
          </Text>
          <Text className="font-[SansMedium] text-lg tracking-tight text-center">
            Travel without limits
          </Text>
        </View>

        {/** Login Input */}
        <View className="mt-12">
          <View className="my-3">
            <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
              Your email address
            </Text>
            <TextInput
              placeholder="travel@gmail.com"
              className="border border-gray-300 rounded-3xl px-4 py-3"
            />
          </View>
          <View className="my-3">
            <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
              Choose a password
            </Text>
            <View className="relative">
              <TextInput
                textContentType="password"
                placeholder="min. 8 characters"
                className="border border-gray-300 rounded-3xl px-4 py-3"
              />
              <View className="absolute right-2 bottom-[25%]">
                <Feather name="eye" size={22} color="#c2c1be" />
                {/* <Feather name="eye-off" size={22} color="#c2c1be" /> */}
              </View>
            </View>
          </View>
        </View>

        {/** Login Container */}
        <View>
          {/** Login Button */}
          <TouchableOpacity>
            <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
              <Text className="font-[SansMedium] text-[15px] tracking-tighter text-center">
                Continue
              </Text>
              <View className="absolute right-2 top-[70%]">
                <Entypo name="chevron-right" size={22} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          {/** Split */}
          <View className="flex-row items-center my-4">
            <View className="bg-gray-200 h-[1px] flex-1"></View>
            <Text className="font-[SansMedium] text-md text-gray-400 my-5 mx-4 text-center">
              or
            </Text>
            <View className="bg-gray-200 h-[1px] flex-1"></View>
          </View>

          {/** Register Button */}
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <View className="border border-gray-300 rounded-3xl px-4 py-4">
              <Text className="font-[SansMedium] text-md tracking text-center">
                Sign up with GoTravel
              </Text>
              <View className="absolute right-2 top-[70%]">
                <Entypo name="chevron-right" size={22} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
