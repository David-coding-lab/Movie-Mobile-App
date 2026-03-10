import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { navigate } from "expo-router/build/global-state/routing";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-primary ">
      {/* Heading */}
      <View className="flex-row h-24 pt-4 items-center justify-between px-4">
        <TouchableWithoutFeedback>
          <View className="w-14 h-14 items-center justify-center rounded-full bg-primaryLight2">
            <Entypo name="menu" size={24} color="#7500EB" />
          </View>
        </TouchableWithoutFeedback>
        <Text className="font-beVietnamSemiBold text-textLight1 text-2xl">
          Movie Jam
        </Text>
        <TouchableWithoutFeedback onPress={() => navigate("./search")}>
          <View className="w-14 h-14 items-center justify-center rounded-full bg-primaryLight2">
            <FontAwesome name="search" size={24} color="#7500EB" />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* Hero Section */}
      <View className="bg-primaryLight3 justify-center w-11/12 h-56 self-center rounded-2xl mt-4 overflow-hidden">
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 12 }}
          className="flex-1 justify-center px-4"
        >
          <View className="absolute inset-0 bg-black/50" />
          <View className="w-24 h-8 rounded-xl items-center justify-center bg-accent">
            <Text className="text-textLight1 text-xs font-beVietnamSemiBold">
              FEATURED
            </Text>
          </View>

          <Text className="truncate text-2xl font-beVietnamMedium color-white">
            The Latest Of 2026
          </Text>
          <Text className="mt-2 text-textLight2 text-base font-beVietnamMedium">
            view now <Entypo name="chevron-right" size={16} color="#CBD5E1" />
          </Text>
        </ImageBackground>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full h-fit mt-8"
        contentContainerClassName="px-4 flex-row gap-3"
      >
        <TouchableOpacity className="px-6 py-3 rounded-3xl items-center bg-accent shadow-violet-700/50 shadow-lg h-fit">
          <Text className="text-textLight1 font-beVietnamRegular">Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-6 py-3 rounded-3xl items-center bg-accent shadow-violet-700/50 shadow-lg h-fit">
          <Text className="text-textLight1 font-beVietnamRegular">
            New Releases
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-6 py-3 rounded-3xl items-center bg-accent shadow-violet-700/50 shadow-lg h-fit">
          <Text className="text-textLight1 font-beVietnamRegular">
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-6 py-3 rounded-3xl items-center bg-accent shadow-violet-700/50 shadow-lg h-fit">
          <Text className="text-textLight1 font-beVietnamRegular">
            Featured
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
