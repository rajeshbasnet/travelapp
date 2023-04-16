import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

export default function Register({navigation}) {
  return (
    <SafeAreaView className="flex-1 justify-center bg-white">
      <View className="mx-6">
        {/** Login Header */}
        <View>
          <Text className="font-[BalooBold] text-3xl leading-10 text-center">
            Go Travel
          </Text>
          <Text className="text-lg tracking-tight text-center font-[SansMedium]">
            Travel without limits
          </Text>
        </View>

        {/** Login Input */}
        <View className="mt-8">
          {/** Email Address Field */}
          <View className="my-2">
            <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
              Your email address
            </Text>
            <TextInput
              placeholder="travel@gmail.com"
              className="border border-gray-300 rounded-3xl px-4 py-3"
            />
          </View>

          {/** Password Field */}
          <View className="my-2">
            <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
              Choose a password
            </Text>
            <View className="relative">
              <TextInput
                placeholder="min. 8 characters"
                className="border border-gray-300 rounded-3xl px-4 py-3"
              />
              <View className="absolute right-2 bottom-[25%]">
                <Feather name="eye" size={22} color="#c2c1be" />
                {/* <Feather name="eye-off" size={22} color="#c2c1be" /> */}
              </View>
            </View>
          </View>

          {/** Phone Number Field */}
          <View className="my-2">
            <Text className="text-[15px] tracking-tighter leading-10 font-[SansMedium]">
              Enter your number
            </Text>
            <View className="relative">
              <TextInput
                keyboardType="numeric"
                placeholder="eq. 10 numbers required"
                className="border border-gray-300 rounded-3xl px-4 py-3"
              />
            </View>
          </View>

          {/** Terms and Conditions */}
          <View className="flex-row items-center my-2">
            <BouncyCheckbox disableText={false} size={20} isChecked={true} />
            <Text className="font-[SansMedium] tracking-tight text-sm">
              I hereby agree all the terms and conditions.
            </Text>
          </View>
        </View>

        {/** Login Container */}
        <View>
          {/** Login Button */}
          <TouchableOpacity>
            <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
              <Text className="text-[15px] text-center font-[SansMedium]">
                Continue
              </Text>
              <View className="absolute right-2 top-[70%]">
                <Entypo name="chevron-right" size={22} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          {/** Split */}
          <View className="flex-row items-center">
            <View className="bg-gray-200 h-[1px] flex-1"></View>
            <Text className="text-md text-gray-400 my-4 mx-4 text-center">
              or
            </Text>
            <View className="bg-gray-200 h-[1px] flex-1"></View>
          </View>

          {/** Register Button */}
          <TouchableOpacity onPress={() => navigation.pop()}>
            <View className="border border-gray-300 rounded-3xl px-4 py-4">
              <Text className="text-md tracking text-center font-[SansMedium]">
                Login with GoTravel
              </Text>
              <View className="absolute left-2 top-[70%]">
                <Entypo name="chevron-left" size={22} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
