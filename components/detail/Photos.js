import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { replaceUrlWidthHeight } from "../../utility/Util";

export default function Photos({ photos }) {
    return (
        <View className="my-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {photos &&
                    photos.map((photo, index) => {
                        const moreUrl = replaceUrlWidthHeight(photo, 300, 300);
                        return (
                            <View className="mx-2 rounded-3xl" key={index}>
                                <Image
                                    src={moreUrl}
                                    className="w-[250px] h-[120px] rounded-xl"
                                    resizeMode="cover"
                                />
                            </View>
                        );
                    })}
            </ScrollView>
        </View>
    );
}
