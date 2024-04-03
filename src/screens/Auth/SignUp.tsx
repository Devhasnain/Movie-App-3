import {
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { AuthContext } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

const SignUp = ({ navigation }: any) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const Auth = useContext(AuthContext);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (!form?.email?.trim()?.length || !form?.password?.trim()?.length) {
        throw new Error("All fields are required.");
      }

      let credentials = await createUserWithEmailAndPassword(
        auth,
        form?.email,
        form.password
      );

      if (credentials?.user) {
        Auth?.setUser(credentials?.user);
        await AsyncStorage.setItem("id", credentials?.user?.uid);
        setIsLoading(false);
      } else {
        throw new Error("Unable to Signup, Please tryagain letter.");
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error?.message?.includes("auth/invalid-credential")) {
        Alert.alert("Invalid Credentails.");
      } else {
        Alert.alert("Unexpected Error.");
      }
    }
  };

  const handleRedirection = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <ImageBackground
        style={{ flex: 1, height: height }}
        source={require("../../assets/splash.jpg")}
      >
        <LinearGradient
          style={{ flex: 1, height: height }}
          colors={[
            "transparent",
            "rgba(0,0,0,0.5)",
            "rgba(0,0,0,0.5)",
            "rgba(0,0,0,0.5)",
          ]}
        >
          <View style={styles().mainContainer}>
            <View style={[styles().inputContainer, { paddingHorizontal: 20 }]}>
              <View>
                <Text
                  variant="headlineSmall"
                  style={{ color: "white", fontWeight: "700" }}
                >
                  Sign Up
                </Text>
              </View>

              <TextInput
                mode="flat"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                }}
                contentStyle={{ color: "black" }}
                textColor="black"
                cursorColor="black"
                placeholderTextColor={"black"}
                underlineColor="red"
                activeUnderlineColor="red"
                value={form.email}
                inputMode="email"
                onChangeText={(e) => setForm({ ...form, email: e })}
                label={<Text style={{ color: "black" }}>Email</Text>}
              />
              <TextInput
                mode="flat"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  width: "100%",
                }}
                contentStyle={{ color: "black" }}
                textColor="black"
                cursorColor="black"
                placeholderTextColor={"black"}
                underlineColor="red"
                activeUnderlineColor="red"
                value={form.password}
                inputMode="text"
                onChangeText={(e) => setForm({ ...form, password: e })}
                label={<Text style={{ color: "black" }}>Password</Text>}
              />

              <View style={{ marginTop: 10, width: "100%" }}>
                <Button
                  loading={isLoading}
                  onPress={onSubmit}
                  disabled={!form?.email || !form.password}
                  mode="contained"
                  contentStyle={[styles().SubmitBth]}
                  style={styles().SubmitBth}
                  textColor="black"
                  labelStyle={{ fontSize: 18 }}
                >
                  Submit
                </Button>
              </View>

              <View style={{ marginTop: 10 }}>
                <Button onPress={handleRedirection} textColor="white">
                  already have and account?
                </Button>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};

const styles = (bg?: string) =>
  StyleSheet.create({
    mainContainer: {
      width: "100%",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    logoContainer: {
      height: 150,
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputContainer: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      gap: 15,
    },
    SubmitBth: {
      fontSize: 20,
      color: "black",
      width: "100%",
      paddingVertical: 4,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: "white",
    },
    SubmitBthBg: {
      backgroundColor: bg,
    },
  });

export default SignUp;
