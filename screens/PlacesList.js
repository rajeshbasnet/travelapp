import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import Header from '../components/shared/Header';
import {useDispatch, useSelector} from 'react-redux';
import {setHotels} from '../redux/placeSlice';
import {getHotels} from '../services/PlaceService';
import {useEffect} from 'react';
import {FlatList} from 'react-native';
import Place from '../components/places/Place';

export default function PlacesList({navigation, route}) {
  //TODO : Use this location to find hotels, attractions
  const place_name = route.params?.place;
  const [category, setCategory] = useState('HOTELS');

  const dispatch = useDispatch();
  const hotels = useSelector(state => state.place.hotels);

  useEffect(() => {
    getHotels().then(responseData => {
      dispatch(setHotels(responseData));
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 h-full w-full">
      <Header navigation={navigation} />
      <View className="mt-4 flex-row items-center">
        <TouchableOpacity onPress={() => setCategory('HOTELS')}>
          <Text
            className={
              category == 'HOTELS'
                ? 'bg-[#A2FD7D] border-[#A2FD7D] text-gray-700 border-2 px-4 py-2 rounded-3xl font-[SansBold] ml-4 tracking-tighter'
                : 'border-[#A2FD7D] text-gray-700 border-2 px-4 py-2 rounded-3xl  font-[SansBold] ml-4 tracking-tighter'
            }>
            Hotel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCategory('RESTAURANTS')}>
          <Text
            className={
              category == 'RESTAURANTS'
                ? 'bg-[#A2FD7D] border-2 border-[#A2FD7D] text-gray-700 px-4 py-2 rounded-3xl font-[SansBold] ml-4 tracking-tighter'
                : 'border-[#A2FD7D] text-gray-700 border-2 px-4 py-2 rounded-3xl font-[SansBold] ml-4 tracking-tighter '
            }>
            Restaurants
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        className="mx-2 mt-2"
        data={hotels}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <Place item={item} navigation={navigation} />;
        }}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  );
}
