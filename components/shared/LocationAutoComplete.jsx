import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {hideAutoComplete} from '../../redux/locationAutoCompleteSlice';

export default function LocationAutoComplete({
  locations,
  setSearchLocationQuery,
  navigation,
}) {
  const dispatch = useDispatch();
  const autoCompleteShow = useSelector(state => state.location.show);

  function pressHandler(display_place) {
    setSearchLocationQuery(display_place);
    dispatch(hideAutoComplete());
    navigation.navigate('places_list', {place: display_place});
  }

  return (
    autoCompleteShow && (
      <View
        className="h-[250px] py-4 rounded-3xl bg-[#fbfbff] fixed w-full z-20"
        style={styles.elevation}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {locations.map((location, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="px-4 py-2"
                onPress={() => pressHandler(location.display_place)}>
                <Text className="text-[16px] font-[BalooExtrabold] leading-5">
                  {location?.display_place}
                </Text>
                <Text className="font-[BalooRegular] text-md leading-5">
                  {location?.display_address}
                </Text>
                <View className="w-full bg-gray-200 h-[2px] my-1"></View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  elevation: {
    elevation: 5,
    shadowRadius: 10,
    shadowColor: '#4A5AFC',
    shadowOffset: [-50, -50],
  },
});
