import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { navigate } from "expo-router/build/global-state/routing";
import { Text, TouchableNativeFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <View className="flex-row pt-4 items-center justify-between px-6">
        <TouchableNativeFeedback>
          <View className="w-14 h-14 items-center justify-center rounded-full bg-primaryLight2">
            <Entypo name="menu" size={24} color="#7500EB" />
          </View>
        </TouchableNativeFeedback>
        <Text className="font-beVietnamSemiBold text-textLight1 text-3xl">
          Movie Jam
        </Text>
        <TouchableNativeFeedback onPress={() => navigate("./search")}>
          <View className="w-14 h-14 items-center justify-center rounded-full bg-primaryLight2">
            <FontAwesome name="search" size={24} color="#7500EB" />
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
}
