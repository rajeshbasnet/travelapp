import {
    View,
    Text,
    Modal,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Alert from "../shared/Alert";

export default function Reviews({ reviews, addReviews }) {
    const [review, setReview] = useState({
        text: "",
        title: "",
    });

    const [showModal, setShowModal] = useState(false);

    function buildReview() {
        if (review.text && review.title) {
            addReviews(review);
            setShowModal(!showModal);
        }
    }

    return (
        <View className="mt-14 flex-1">
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setShowModal(!showModal);
                }}
            >
                <View style={styles.centeredView}>
                    <View
                        style={styles.modalView}
                        className="w-[90%] h-[400px]"
                    >
                        <Text className="font-[BalooBold] text-xl w-full text-right">
                            Your reviews
                        </Text>

                        <View className="my-3 w-full">
                            <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                Add your Title
                            </Text>
                            <TextInput
                                placeholder="travel@gmail.com"
                                className="border border-gray-300 rounded-xl px-4 py-3"
                                value={review.title}
                                onChangeText={(value) =>
                                    setReview({ ...review, title: value })
                                }
                            />
                        </View>
                        <View className="my-3 w-full">
                            <Text className="font-[SansMedium] text-[15px] tracking-tighter leading-10">
                                Place your reviews
                            </Text>
                            <View className="relative">
                                <TextInput
                                    multiline
                                    textContentType="password"
                                    placeholder="min. 8 characters"
                                    className="border border-gray-300 rounded-xl px-4 py-3"
                                    value={review.text}
                                    onChangeText={(value) =>
                                        setReview({
                                            ...review,
                                            text: value,
                                        })
                                    }
                                />
                            </View>
                        </View>

                        <View className="flex-row items-center justify-around">
                            <TouchableOpacity onPress={buildReview}>
                                <View className="relative w-[140px] mr-1 my-2">
                                    <Text className="font-[SansMedium] tracking-tight bg-blue-500 text-gray-50 rounded-3xl px-2 py-2 text-center">
                                        Submit
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setShowModal(!showModal)}
                            >
                                <View className="relative w-[140px] ml-1 my-2">
                                    <Text className="font-[SansMedium] tracking-tight bg-red-600 text-gray-50 rounded-3xl px-2 py-2 text-center">
                                        Close Modal
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Text className="font-[BalooBold] text-xl text-gray-600">
                Reviews
            </Text>

            <View>
                <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                    <View className="relative w-[140px] mt-5 mb-2">
                        <Text className="font-[SansMedium] tracking-tight bg-blue-500 text-gray-50 rounded-3xl px-2 py-2 text-center">
                            Add Review
                        </Text>

                        <View className="absolute right-1 top-[20%]">
                            <Entypo
                                name="chevron-right"
                                size={22}
                                color="white"
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                {reviews &&
                    reviews?.content?.map((item, index) => {
                        return (
                            <View
                                key={index}
                                className="my-2 bg-white px-2 py-2 rounded-md shadow-blue-300"
                                style={{
                                    elevation: 100,
                                }}
                            >
                                <Text className="text-md font-[SansMedium] text-gray-600">
                                    {item.title}
                                </Text>
                                <Text className="text-[12px] leading-5 text-gray-500 text-justify my-2">
                                    {item.text
                                        .slice(0, 300)
                                        .split("<br />")
                                        .map((item) => item)}
                                </Text>
                                <View className="items-end">
                                    <Text className="text-[12px] leading-5 text-gray-500 w-[150px] text-right">
                                        {item.publishedDate}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});
