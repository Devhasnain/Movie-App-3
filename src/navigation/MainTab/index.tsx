import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeStack from "../HomeStack";
import ExploreStack from "../ExploreStack";
import ProfileStack from "../ProfileStack";
import COLORS from "@/constants/colors";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { auth } from "@/firebase/firebase";
import Login from "@/screens/Auth/Login";
import SignUp from "@/screens/Auth/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetailScreen from "@/screens/MovieDetailScreen";
import FullCastScreen from "@/screens/FullCastScreen";

const Stack = createNativeStackNavigator();

const MainTab = () => {
  const Auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      Auth?.setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
      {Auth?.user ? (
        <>
          <Stack.Screen name="HomeTab" component={HomeStack} />
          <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
          <Stack.Screen name="FullCast" component={FullCastScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              animation: "slide_from_left",
            }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{
              animation: "slide_from_right",
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainTab;
