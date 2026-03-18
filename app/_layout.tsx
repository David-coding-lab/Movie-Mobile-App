import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import "./globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [loaded, error] = useFonts({
    "BeVietnamPro-Black": require("../assets/fonts/BeVietnamPro-Black.ttf"),
    "BeVietnamPro-Regular": require("../assets/fonts/BeVietnamPro-Regular.ttf"),
    "BeVietnamPro-SemiBold": require("../assets/fonts/BeVietnamPro-SemiBold.ttf"),
    "BeVietnamPro-Medium": require("../assets/fonts/BeVietnamPro-Medium.ttf"),
    "BeVietnamPro-Light": require("../assets/fonts/BeVietnamPro-Light.ttf"),
    "BeVietnamPro-Thin": require("../assets/fonts/BeVietnamPro-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#251535",
          width: 280,
        },
        drawerActiveTintColor: "#7500EB",
        drawerInactiveTintColor: "#94A3B8",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ drawerLabel: "Home", title: "Home" }}
      />

      <Drawer.Screen
        name="movies/[id]"
        options={{
          drawerLabel: "Movie Details",
          title: "Movie Details",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} className="ml-4">
              <Ionicons
                className="mx-4"
                name="arrow-back"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <>
              <TouchableOpacity className="mr-4">
                <Ionicons
                  className="mx-4"
                  name="share-social"
                  size={24}
                  color="#fff"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/search")}
                className="mr-4"
              >
                <Ionicons name="heart-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </>
          ),
          headerStyle: {
            backgroundColor: "#251535",
          },
          headerTintColor: "#fff",
        }}
      />
    </Drawer>
  );
}
