import {
    View,
    Text,
    Button,
    Pressable,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../redux/globalSlice";

const checkInUtil = "checkIn";
const checkOutUtil = "checkOut";
const add = "add";
const subtract = "subtract";

export default function Test() {
    let [date, setDate] = useState(new Date());
    let [checkIn, setCheckIn] = useState(new Date());
    let [checkOut, setCheckOut] = useState(new Date());
    let [guestNum, setGuestNum] = useState("1");

    let success = useSelector((state) => state.global.success);
    let error = useSelector((state) => state.global.error);

    const dispatch = useDispatch();

    const onChangeIn = (event, selectedDate) => {
        const currentDate = selectedDate;
        setCheckIn(currentDate);
    };

    const onChangeOut = (event, selectedDate) => {
        const currentDate = selectedDate;
        setCheckOut(currentDate);
    };

    const showMode = (currentMode, action) => {
        if (action == checkInUtil) {
            DateTimePickerAndroid.open({
                value: date,
                onChange: onChangeIn,
                mode: currentMode,
                is24Hour: true,
            });
        } else {
            DateTimePickerAndroid.open({
                value: date,
                onChange: onChangeOut,
                mode: currentMode,
                is24Hour: true,
            });
        }
    };

    const showDatepicker = (action) => {
        showMode("date", action);
    };

    const updateGuestNum = (action) => {
        if (action == add) {
            guestNum = (Number(guestNum) + 1).toString();
            setGuestNum(guestNum);
        } else {
            if (guestNum >= 2) {
                guestNum = (Number(guestNum) - 1).toString();
                setGuestNum(guestNum);
            }

            if (guestNum == 3) {
                dispatch(setError("Guest is only limited to three"));

                setTimeout(() => {
                    dispatch(setError(""));
                }, []);
            }
        }
    };

    return (
        <SafeAreaView className="mt-12 mx-2">
            <View className="flex-row items-center justify-center bg-[#1e81b0] py-4 rounded-lg">
                {/** Check In Section */}
                <TouchableOpacity onPress={() => showDatepicker(checkInUtil)}>
                    <View className="px-4">
                        <Text className="font-[SansMedium] tracking-tight text-white">
                            Check In
                        </Text>
                        <TextInput
                            className="font-[SansMedium] tracking-tight text-gray-200 mt-2"
                            editable={false}
                            value={checkIn.toLocaleDateString()}
                        />
                    </View>
                </TouchableOpacity>

                {/** Check Out Section */}
                <TouchableOpacity onPress={() => showDatepicker(checkOutUtil)}>
                    <View className="border-l-2 px-6 border-r-2 border-white">
                        <Text className="font-[SansMedium] tracking-tight  text-white">
                            Check Out
                        </Text>
                        <TextInput
                            className="font-[SansMedium] tracking-tight text-gray-200 mt-2"
                            editable={false}
                            value={checkOut.toLocaleDateString()}
                        />
                    </View>
                </TouchableOpacity>

                {/** Guests section */}
                <View className="px-6">
                    <Text className="font-[SansMedium] tracking-tight text-center text-white">
                        Guests
                    </Text>
                    <View className="flex-row items-center mt-2">
                        <TouchableOpacity
                            onPress={() => updateGuestNum(subtract)}
                        >
                            <View className="pr-2">
                                <Entypo
                                    name="circle-with-minus"
                                    size={24}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>
                        <Text className="font-[SansMedium] text-lg text-white">
                            {guestNum}
                        </Text>
                        <TouchableOpacity onPress={() => updateGuestNum(add)}>
                            <View className="pl-2">
                                <Entypo
                                    name="circle-with-plus"
                                    size={24}
                                    color="white"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
