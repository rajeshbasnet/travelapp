import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setLoading} from '../redux/globalSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function Chatbot({navigation}) {
  const loading = useSelector(state => state.global.loading);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const [textInput, setTextInput] = useState('');

  const handleSend = async () => {
    dispatch(setLoading(true));
    setTextInput('');
    Keyboard.dismiss();
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [{role: 'user', content: `${textInput}`}],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const text = response.data.choices[0].message.content;
    setData([
      ...data,
      {
        type: 'user',
        text: textInput,
      },
      {type: 'bot', text: text},
    ]);
    dispatch(setLoading(false));
  };

  useLayoutEffect(() => {
    dispatch(setLoading(false));
  }, []);

  return (
    <SafeAreaView
      className="flex-1 pt-4 bg-slate-300"
      onPress={() => Keyboard.dismiss()}>
      {/** Header */}
      <View className="mb-4">
        <Text className="font-[SansMedium] tracking-tight text-center text-xl text-gray-950">
          Welcome to the Chatbot
        </Text>
        <View className="absolute ml-3">
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Ionicons
              name="ios-arrow-undo-circle-outline"
              size={28}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View className="flex-1 rounded-tl-3xl rounded-tr-3xl bg-white">
        {/** Chat Results */}
        <FlatList
          className="px-4 flex-1"
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View className="flex-row items-end justify-end py-2">
                <Text className="bg-blue-500 px-4 py-2 text-gray-100 rounded-xl font-[SansRegular] tracking-tighter leading-6">
                  {item.text.trim()}
                </Text>
                <View className="ml-2 px-1 py-1 rounded-full bg-slate-800">
                  {item.type === 'user' ? (
                    <View>
                      <AntDesign name="user" size={15} color="white" />
                    </View>
                  ) : (
                    <View>
                      <MaterialCommunityIcons
                        name="robot-excited-outline"
                        size={15}
                        color="white"
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          }}
        />

        {loading ? <ActivityIndicator /> : <View></View>}

        {/** Question Input */}
        <View className="px-4 py-2">
          <TextInput
            className="px-4 py-3 border rounded-3xl border-gray-300 text-md font-[SansRegular] tracking-tight"
            value={textInput}
            onChangeText={text => setTextInput(text)}
            placeholder="Ask me anything"></TextInput>

          {/** Submit Input */}
          <TouchableOpacity onPress={handleSend}>
            <View className="mt-2 bg-[#A2FD7D] rounded-3xl px-4 py-4">
              <Text className="font-[SansBold] text-[15px] tracking-tighter text-center">
                Continue
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
