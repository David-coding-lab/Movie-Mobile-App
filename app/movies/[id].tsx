import { MovieDetails, Movie as MovieType } from "@/types/movies";
import {
  getMovieById,
  getMovieCredits,
  getSimilarMovies,
} from "@/utils/getMovieByTitle";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

// const { width } = Dimensions.get("window");

const VideoPlayer = ({
  videoUrl,
  onClose,
}: {
  videoUrl: string;
  onClose: () => void;
}) => {
  const player = useVideoPlayer(videoUrl, (p) => {
    p.loop = false;
  });

  useEffect(() => {
    player.currentTime = 0;
    player.play();

    return () => {
      player.pause();
      void ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    };
  }, [player]);

  const doubleTapLeft = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (player) {
        player.currentTime = Math.max(0, player.currentTime - 10);
      }
    });

  const doubleTapRight = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (player) {
        player.currentTime += 10;
      }
    });

  return (
    <View className="flex-1">
      <GestureDetector
        gesture={Gesture.Exclusive(doubleTapLeft, doubleTapRight)}
      >
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%" }}
          allowsFullscreen
          allowsPictureInPicture
          onFullscreenEnter={() => {
            void ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.LANDSCAPE,
            );
          }}
          onFullscreenExit={() => {
            void ScreenOrientation.lockAsync(
              ScreenOrientation.OrientationLock.PORTRAIT_UP,
            );
          }}
        />
      </GestureDetector>
      <TouchableOpacity
        className="absolute top-12 right-4 bg-black/50 p-2 rounded-full"
        onPress={() => {
          player.pause();
          onClose();
        }}
      >
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const Movie = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [similar, setSimilar] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setShowPlayer(false);
      setLoading(true);
      try {
        const [movieData, castData, similarData] = await Promise.all([
          getMovieById(Number(id)),
          getMovieCredits(Number(id)),
          getSimilarMovies(Number(id)),
        ]);
        setMovie(movieData);
        setCast(castData);
        setSimilar(similarData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator size="large" color="#7500EB" />
      </View>
    );
  }

  const backdropUri = `https://image.tmdb.org/t/p/original${movie?.backdrop_path}`;
  const profileBaseUri = "https://image.tmdb.org/t/p/w185";
  const posterBaseUri = "https://image.tmdb.org/t/p/w342";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: movie?.title || "Details",
          headerTransparent: true,
          headerTintColor: "white",
          headerTitleStyle: { fontFamily: "BeVietnamPro-Medium" },
        }}
      />
      <ScrollView
        className="flex-1 bg-primary"
        showsVerticalScrollIndicator={false}
      >
        {/* Video Player / Header Section */}
        <View className="h-[380px] w-full bg-black shadow-2xl">
          {showPlayer ? (
            <VideoPlayer
              key={String(id)}
              videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              onClose={() => setShowPlayer(false)}
            />
          ) : (
            <ImageBackground
              source={{ uri: backdropUri }}
              className="flex-1 justify-center items-center"
              resizeMode="cover"
            >
              <View className="absolute inset-0 bg-black/30" />
              <TouchableOpacity
                activeOpacity={0.8}
                className="w-20 h-20 bg-accent rounded-full items-center justify-center shadow-2xl shadow-accent"
                onPress={() => setShowPlayer(true)}
              >
                <Ionicons
                  name="play"
                  size={40}
                  color="white"
                  className="ml-1"
                />
              </TouchableOpacity>

              <View className="absolute bottom-4 left-4 right-4">
                <Text
                  className="font-beVietnamBlack text-2xl color-white shadow-lg"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {movie?.title}
                </Text>
                <View className="flex-row items-center mt-1 gap-2">
                  <Text className="color-accent font-beVietnamMedium">
                    {movie?.release_date.split("-")[0]}
                  </Text>
                  <View className="w-1 h-1 bg-gray-400 rounded-full" />
                  <Text className="color-gray-300 font-beVietnamRegular">
                    {movie?.runtime} min
                  </Text>
                  <View className="w-1 h-1 bg-gray-400 rounded-full" />
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text className="color-white font-beVietnamMedium ml-1">
                      {movie?.vote_average.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
          )}
        </View>

        {/* Overview Section */}
        <View className="px-4 py-6">
          <Text className="font-beVietnamSemiBold text-xl color-white mb-3">
            Overview
          </Text>
          <Text className="font-beVietnamRegular text-base color-textDark leading-6">
            {movie?.overview}
          </Text>
        </View>

        {/* Cast Section */}
        <View className="mb-8">
          <Text className="font-beVietnamSemiBold text-xl color-white px-4 mb-4">
            Cast
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4 flex-row gap-5"
          >
            {cast.slice(0, 10).map((actor, index) => (
              <View key={index} className="items-center w-20">
                <View className="w-16 h-16 rounded-full bg-primaryLight2 overflow-hidden border-2 border-primaryLight3 shadow-sm">
                  {actor.profile_path ? (
                    <Image
                      source={{ uri: `${profileBaseUri}${actor.profile_path}` }}
                      className="w-full h-full"
                    />
                  ) : (
                    <View className="flex-1 items-center justify-center">
                      <Ionicons name="person" size={30} color="#94A3B8" />
                    </View>
                  )}
                </View>
                <Text
                  className="color-white text-center mt-2 font-beVietnamMedium text-xs"
                  numberOfLines={2}
                >
                  {actor.name}
                </Text>
                <Text
                  className="color-textDark text-center font-beVietnamRegular text-[10px]"
                  numberOfLines={1}
                >
                  {actor.character}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Similar Movies Section */}
        <View className="mb-10">
          <Text className="font-beVietnamSemiBold text-xl color-white px-4 mb-4">
            Similar Movies
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4 flex-row gap-4"
          >
            {similar.map((movie, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setShowPlayer(false);
                  router.push(`/movies/${movie.id}`);
                }}
                className="w-32"
              >
                <View className="h-44 bg-primaryLight3 rounded-2xl overflow-hidden shadow-lg shadow-black/50">
                  <Image
                    source={{ uri: `${posterBaseUri}${movie.poster_path}` }}
                    className="w-full h-full"
                  />
                </View>
                <Text
                  className="color-white mt-2 font-beVietnamMedium text-sm"
                  numberOfLines={1}
                >
                  {movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Movie;
