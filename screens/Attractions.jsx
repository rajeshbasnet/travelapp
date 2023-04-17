import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/shared/Header';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import AttractionList from '../components/attractions/AttractionList';

export default function Attractions({navigation}) {
  const popularPlaces = useSelector(state => state.place.attractions);
  return (
    <SafeAreaView className="flex-1">
      <Header navigation={navigation} />

      <View className="mx-4 mt-8">
        <Text className="font-[BalooBold] text-3xl">
          Best attractions nearby
        </Text>
        <Text className="font-[BalooBold] text-3xl">your place.</Text>
      </View>

      <FlatList
        className="mx-2 mt-2 flex-1"
        showsVerticalScrollIndicator={false}
        data={popularPlaces}
        renderItem={({item}) => (
          <AttractionList place={item} navigation={navigation} />
        )}
        keyExtractor={item => item.xid}
      />
    </SafeAreaView>
  );
}
