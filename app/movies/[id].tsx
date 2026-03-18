import { Movie as MovieType } from "@/types/movies";
import { getMovieById } from "@/utils/getMovieByTitle";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const Movie = () => {
  const { id, title } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieType | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieById(Number(id));
        setMovie(response);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);
  return (
    <>
      <Stack.Screen
        options={{
          title: `${title}`,
          headerTitleStyle: {
            fontFamily: "BeVietnamPro-Medium",
          },
        }}
      />
      <ScrollView className="w-full">
        <View className="bg-primaryLight3 w-full h-[300px]">
          <ImageBackground
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`,
            }}
            className="flex-1"
            resizeMode="cover"
          >
            <View className="flex-1 bg-black/40">
              <TouchableOpacity className="w-20 h-20 bg-accent items-center justify-center rounded-full self-center mt-28">
                <Ionicons name="play-outline" size={24} color="white" />
              </TouchableOpacity>

              <Text className="font-beVietnamBlack text-3xl mt-20 ml-4 color-white">
                {movie?.title || "Movies In the house"}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View className="min-h-80 h-fit bg-primary">
          <Text className="font-beVietnamMedium text-lg mt-4 ml-4 color-white">
            {movie?.overview}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

export default Movie;
