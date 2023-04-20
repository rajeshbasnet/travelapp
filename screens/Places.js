import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/shared/Header';
import {getHotels} from '../services/PlaceService';
import {useDispatch, useSelector} from 'react-redux';
import {setHotels} from '../redux/placeSlice';
import Place from '../components/places/Place';

export default function Places({navigation}) {
  const dispatch = useDispatch();
  const hotels = useSelector(state => state.place.hotels);

  useEffect(() => {
    getHotels().then(responseData => {
      dispatch(setHotels(responseData));
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F4F5FF]">
      {/** Header for Places Screen */}
      <Header navigation={navigation} />

      <View className="mt-10 flex-1">
        <View className="mx-4">
          <Text className="font-[BalooBold] text-3xl">
            The Best Hotels nearby
          </Text>
          <Text className="font-[BalooBold] text-3xl">your Place.</Text>
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
      </View>
    </SafeAreaView>
  );
}
