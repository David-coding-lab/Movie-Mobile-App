import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-primary">
      <TouchableOpacity
        onPress={() => router.push("/sign-in")}
        className="w-32 bg-accent py-3 rounded-full items-center justify-center"
      >
        <Text className="color-white font-beVietnamRegular">Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
