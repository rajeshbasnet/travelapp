import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import React from 'react';
import {useState, useCallback} from 'react';
import {getAttractionDetails} from '../services/DiscoverService';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {hideAbout, setAbout} from '../redux/detailSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Linking} from 'react-native';

const OpenURLButton = ({url, children}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity>
      <View className="mt-6 bg-[#A2FD7D] rounded-3xl px-4 py-4">
        <Text
          className="font-[SansMedium] text-[15px] tracking-tighter text-center"
          onPress={handlePress}>
          {children}
        </Text>
        <View className="absolute right-2 top-[70%]">
          <Entypo name="chevron-right" size={22} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function AttractionDetails({navigation, route}) {
  const [attractionDetail, setAttractionDetail] = useState({});
  let showAbout = useSelector(state => state.detail.showAbout);
  let dispatch = useDispatch();

  async function getAttractionDetailsFromXID() {
    try {
      const details = await getAttractionDetails(route.params?.xid);
      setAttractionDetail(details);

      //TODO : Loading
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  useEffect(() => {
    if (route.params?.xid) {
      getAttractionDetailsFromXID();
    }
  }, []);

  return (
    <ScrollView>
      <SafeAreaView className="flex-1">
        <View className="relative">
          <View className="relative h-[300px]">
            <ImageBackground
              src={
                attractionDetail.preview ? attractionDetail.preview.source : ''
              }
              resizeMode="cover"
              className="w-full h-full"
            />
            <View
              className="absolute w-full h-full"
              style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}></View>
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
        </View>
        <View className="bg-[#F4F5FF] rounded-3xl bottom-10 h-full">
          <View className="mx-4 mt-10">
            <Text className="text-gray-700 font-[BalooBold] text-3xl w-[300px] leading-10">
              {attractionDetail?.name}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 font-[BalooBold] text-md">
                {attractionDetail?.address?.state}
              </Text>
              <Text className="text-gray-700 font-[BalooBold] text-md">
                {attractionDetail?.address?.country}
              </Text>
              <View className="flex-row items-baseline">
                <AntDesign name="star" size={15} color="#F5D04A" />
                <Text className="font-[BalooBold] text-md ml-2">
                  {attractionDetail?.rate}
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-8 mx-4">
            <Text className="font-[BalooBold] text-xl text-gray-600">
              About
            </Text>
            <Text className="text-[12px] leading-5 text-gray-400 text-justify">
              {attractionDetail?.wikipedia_extracts?.text &&
                (showAbout
                  ? attractionDetail?.wikipedia_extracts?.text
                  : attractionDetail?.wikipedia_extracts?.text.slice(0, 250))}
              <TouchableWithoutFeedback onPress={() => dispatch(setAbout())}>
                <Text className="text-[#2DAFBC]">
                  &nbsp;&nbsp;
                  {attractionDetail?.wikipedia_extracts?.text && showAbout
                    ? 'Read Less'
                    : 'Read More'}
                </Text>
              </TouchableWithoutFeedback>
            </Text>
            <View className="my-4">
              <Text className="font-[BalooBold] text-xl text-gray-600">
                Kinds
              </Text>
              <Text className="text-[12px] leading-5 text-[#2DAFBC] text-justify">
                {attractionDetail?.kinds
                  ?.split(',')
                  .map(detail => detail + ',   ')}
              </Text>
            </View>

            <OpenURLButton url={attractionDetail?.otm}>Explore</OpenURLButton>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
