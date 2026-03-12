import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { filter } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-2xl font-beVietnamSemiBold">
          Search Page
        </Text>
        <Text className="text-textLight2 mt-2">Filter: {filter || "None"}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;
