import MovieCategory from "@/types/MovieCatrgory";
import Movie from "@/types/movies";
import getMovies from "@/utils/getMovies";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  const router = useRouter();
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<MovieCategory>("popular");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const ImageBaseURL = process.env.EXPO_PUBLIC_TMDB_IMAGE_BASE_URL;

  const heroButtons: { name: string; category: MovieCategory }[] = [
    {
      name: "Popular Movies",
      category: "popular",
    },
    {
      name: "New Releases Movies",
      category: "new",
    },
    {
      name: "Upcoming ",
      category: "upcoming",
    },
    {
      name: "Most Rated Movies",
      category: "random",
    },
  ];

  const handleFilterClick = (category: MovieCategory) => {
    setActiveFilter(category);
    // router.push({
    //   pathname: "/search",
    //   params: { filter: category },
    // });
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const button = heroButtons.find((b) => b.name === activeFilter);
      const category = (button?.category || "popular") as MovieCategory;
      const data = await getMovies(category);

      if (data) {
        setMovies(shuffleArray([...data]));
      }
      setIsLoading(false);
    };

    loadData();
  }, [activeFilter]);

  useEffect(() => {
    const loadData = async () => {
      const category = "new" as MovieCategory;
      const data = await getMovies(category);

      if (data) {
        setNewMovies(() =>
          shuffleArray([data[0], data[1], data[2], data[3], data[4], data[5]]),
        );
      }
    };

    loadData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView>
        {/* Heading */}
        <View className="flex-row h-24 pt-4 items-center justify-between px-4">
          <TouchableWithoutFeedback
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <View className="w-14 h-14 items-center justify-center rounded-full bg-primaryLight2">
              <Entypo name="menu" size={24} color="#7500EB" />
            </View>
          </TouchableWithoutFeedback>
          <Text className="font-beVietnamSemiBold text-textLight1 text-2xl">
            Movie Jam
          </Text>
          <TouchableWithoutFeedback onPress={() => router.push("/search")}>
            <View className="w-14 h-14 items-center justify-center rounded-full bg-primaryLight2">
              <FontAwesome name="search" size={24} color="#7500EB" />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Hero Section */}
        <View className="bg-primaryLight3 justify-center w-11/12 h-56 self-center rounded-2xl mt-4 overflow-hidden">
          <TouchableWithoutFeedback
            onPress={() => router.push("/search?filter=new")}
          >
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              resizeMode="cover"
              imageStyle={{ borderRadius: 12 }}
              className="flex-1 justify-center px-4"
            >
              <View className="absolute inset-0 bg-black/50" />
              <View className="w-24 h-8 rounded-xl items-center justify-center  mb-2 bg-accent">
                <Text className="text-textLight1 text-xs font-beVietnamSemiBold">
                  FEATURED
                </Text>
              </View>

              <Text className="truncate text-2xl font-beVietnamSemiBold color-white">
                The Latest Of 2026
              </Text>
              <TouchableWithoutFeedback
                onPress={() => router.push("/search?filter=new")}
              >
                <Text className="mt-2 text-textLight2 text-base font-beVietnamMedium">
                  view now{" "}
                  <Entypo name="chevron-right" size={16} color="#CBD5E1" />
                </Text>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </TouchableWithoutFeedback>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="w-full max-h-12 h-fit mt-8"
          contentContainerClassName="px-4 flex-row gap-3"
        >
          {heroButtons.map((button) => (
            <TouchableOpacity
              key={button.category}
              onPress={() => handleFilterClick(button.category)}
              className={"px-6 py-3 rounded-3xl items-center  h-fit"}
              style={{
                backgroundColor:
                  activeFilter === button.category ? "#7500EB" : "#251535",
              }}
            >
              <Text className="text-textLight1 font-beVietnamRegular">
                {button.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-1 max-h-12 items-start justify-between mt-6 flex-row px-6">
          <Text className="text-lg capitalize text-white font-beVietnamSemiBold">
            {activeFilter}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => router.push(`/search?filter=${activeFilter}`)}
          >
            <Text className="text-accent font-beVietnamRegular">See all</Text>
          </TouchableWithoutFeedback>
        </View>

        {isLoading ? (
          <View className="h-72 justify-center items-center">
            <ActivityIndicator size="large" color="#7500EB" />
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName="px-4 flex-row gap-3"
            className="pt-5"
          >
            {movies.map((movie, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    router.push({
                      pathname: `../movies/${movie.id}`,
                      params: { title: movie.original_title },
                    })
                  }
                >
                  <View>
                    <View className="h-60 bg-primaryLight3 w-52 rounded-xl">
                      <ImageBackground
                        className="flex-1"
                        source={{ uri: `${ImageBaseURL}${movie.poster_path}` }}
                        resizeMode="cover"
                        imageStyle={{ borderRadius: 12 }} // Apply radius to the actual image
                      />
                    </View>

                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className=" w-52 mt-3 mb-1 text-white text-base font-beVietnamSemiBold"
                    >
                      {movie.original_title}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      className="w-52 text-textDark font-beVietnamRegular"
                    >
                      {movie.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        <View className="flex-1 px-4 mt-8">
          <Text className="text-lg text-white font-beVietnamSemiBold">
            New Arrivals
          </Text>
        </View>

        <View className="px-4 gap-2 mt-6">
          {newMovies.map((movie, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({
                    pathname: `../movies/${movie.id}`,
                    params: { title: movie.original_title },
                  })
                }
              >
                <View className="flex-1 h-28 p-4 rounded-3xl bg-primaryLight1 items-center flex-row">
                  <View className="h-20 w-20 bg-primaryLight2 rounded-2xl">
                    <Image
                      className="w-full h-full rounded-2xl" // Use w-full and h-full
                      source={{ uri: `${ImageBaseURL}${movie.poster_path}` }}
                      resizeMode="cover" // This ensures the image fills the 20x20 box
                    />
                  </View>
                  <View className="pl-3 flex-1">
                    <Text className="text-white font-beVietnamSemiBold text-base">
                      {movie.original_title}
                    </Text>
                    <Text className="text-textDark text-xs">
                      {movie.release_date}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1 justify-self-end">
                    <FontAwesome name="star-o" size={24} color="#7500EB" />
                    <Text className="font-beVietnamRegular color-accent">
                      {movie.vote_average.toFixed(1)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};
