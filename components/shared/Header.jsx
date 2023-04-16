import {View, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

export default function Header({navigation}) {
  return (
    <View className="mx-2 my-2 flex flex-row items-center justify-between px-1 py-1">
      <TouchableOpacity onPress={() => navigation.pop()}>
        <View className="bg-slate-300 px-2 py-2 rounded-full">
          <FontAwesome5 name="chevron-circle-left" size={20} color="#555cac" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="bg-slate-300 px-3 py-2 rounded-full">
          <FontAwesome name="user" size={20} color="#555cac" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
