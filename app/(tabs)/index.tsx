import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { navigate } from "expo-router/build/global-state/routing";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("Popular Movies");

  const [dummyMovieData, setDummyMovieData] = useState([
    {
      name: "stranger things",
      movieType: "action, sci-fy",
      cast: "paul walker, johnny matthew, steve rogers",
      datePublished: "13-mar-2002",
      preview: "https;//linktomvie",
    },
    {
      name: "interstellar Two",
      cast: "paul walker, johnny matthew, steve rogers",
      datePublished: "13-mar-2002",
      preview: "https;//linktomvie",
      movieType: "action, sci-fy",
    },
    {
      name: "wake up dead man",
      cast: "paul walker, johnny matthew, steve rogers",
      datePublished: "13-mar-2002",
      preview: "https;//linktomvie",
      movieType: "action, sci-fy",
    },
    {
      name: "lilo and stich",
      cast: "paul walker, johnny matthew, steve rogers",
      datePublished: "13-mar-2002",
      preview: "https;//linktomvie",
      movieType: "action, sci-fy, adventure",
    },
  ]);
  const heroButtons = [
    {
      name: "Popular Movies",
      active: true,
    },
    {
      name: "New Releases Movies",
      active: false,
    },
    {
      name: "Upcoming ",
      active: false,
    },
    {
      name: "Most Rated Movies",
      toUrl: "./most-rated",
      active: false,
    },
  ];
  function makeActive(buttonName: string) {
    for (let i = 0; i < heroButtons.length; i++) {
      const element = heroButtons[i];
      if (element.name === buttonName) {
        element.active = true;
        setActiveFilter(element.name);

        if (element.active) {
          element.active = false;
        }
      }
    }
  }
  const heroButtonStyles = {
    active:
      "px-6 py-3 rounded-3xl items-center bg-accent shadow-violet-700/50 shadow-md h-fit",
    inactive: "px-6 py-3 rounded-3xl items-center bg-primaryLight2 h-fit",
  };
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
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
          className="w-full max-h-12 h-fit mt-8"
          contentContainerClassName="px-4 flex-row gap-3"
        >
          {heroButtons.map((button) => {
            return (
              <TouchableOpacity
                key={button.name}
                onPress={() => {
                  makeActive(button.name);
                }}
                className={
                  button.active === true
                    ? heroButtonStyles.active
                    : heroButtonStyles.inactive
                }
              >
                <Text className="text-textLight1 font-beVietnamRegular">
                  {button.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="flex-1 max-h-12 items-start justify-between mt-6 flex-row px-6">
          <Text className="text-lg text-white font-beVietnamSemiBold">
            {activeFilter}
          </Text>
          <Text className="text-accent font-beVietnamRegular">See all</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-4 flex-row gap-3"
          className="pt-5"
        >
          {dummyMovieData.map((movie, index) => {
            return (
              <View key={index}>
                <View className="h-60 bg-primaryLight3 w-52 rounded-xl">
                  <ImageBackground
                    className="flex-1"
                    source={{ uri: movie.preview }}
                  />
                </View>

                <Text className="mt-3 mb-1 text-white text-base font-beVietnamSemiBold">
                  {movie.name}
                </Text>
                <Text className="text-textDark font-beVietnamRegular">
                  {movie.movieType}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <View className="flex-1 px-4 mt-8">
          <Text className="text-lg text-white font-beVietnamSemiBold">
            New Arrivals
          </Text>
        </View>

        <View className="px-4 gap-2 mt-6">
          {dummyMovieData.map((movie, index) => {
            return (
              <View
                key={index}
                className="flex-1 h-28 p-4 rounded-3xl bg-primaryLight1 items-center flex-row"
              >
                <View className="h-20 w-20 bg-primaryLight2 rounded-2xl">
                  <Image
                    className="h-32 w-32 rounded-xl"
                    source={{ uri: "sds" }}
                  />
                </View>
                <View className="pl-3 flex-1">
                  <Text className="text-white font-beVietnamSemiBold text-base">
                    {movie.name}
                  </Text>
                  <Text className="text-textDark text-xs">Action, 1h 55m</Text>
                </View>
                <View className="flex-row items-center gap-1 justify-self-end">
                  <FontAwesome name="star" size={24} className="color-accent" />
                  <Text className="font-beVietnamRegular color-accent">
                    7.2
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
