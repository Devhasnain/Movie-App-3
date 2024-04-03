import { ImageBackground, Pressable, View } from "react-native";
import React from "react";

import useApi from "@/hooks/useApi";
import { getTmdbImage } from "@/utils";
import {
  Background,
  Container,
  ContentContainer,
  GradientOverlay,
  Title,
} from "./styles";
import GenreList from "../GenreList";
import COLORS from "@/constants/colors";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const HeroSection = ({ onPress }: { onPress?: (id: number) => void }) => {
  const { data: movie } = useApi("fetchRandomPopularMovie");

  return (
    <>
      <ImageBackground
        source={{
          uri: getTmdbImage(movie?.poster_path, "w500"),
        }}
        style={{ height: 320, width: "100%" }}
      >
        <LinearGradient
          style={{ height: 320, width: "100%" }}
          colors={[
            "transparent",
            "rgba(0,0,0,0.5)",
            "rgba(0,0,0,0.7)",
            "rgba(0,0,0,0.8)",
          ]}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-end",
              paddingHorizontal: 12,
              paddingBottom: 15,
            }}
          >
            <View 
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
            
            >
              <View
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <Text
                  numberOfLines={2}
                  variant="headlineMedium"
                  style={{ color: "white" }}
                >
                  {movie?.title}
                </Text>
                <Text numberOfLines={3} style={{ color: "white" }}>
                  {movie?.overview}
                </Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", gap: 3, alignItems:"center" }}>
                <Text numberOfLines={2} style={{ color: "white" }}>
                  Date
                </Text>
                <Text numberOfLines={2} style={{ color: "white" }}>
                  .
                </Text>
                <Text numberOfLines={2} style={{ color: "white" }}>
                  {movie?.release_date?.split("-").reverse().join("-")}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </>
    // <Pressable onPress={onPress?.bind(this, movie?.id as number)}>
    //   <Container
    //     style={{
    //       shadowColor: COLORS.secondary,
    //       shadowOffset: { width: 0, height: 0 },
    //       shadowOpacity: 0.2,
    //       shadowRadius: 10,
    //       elevation: 10,
    //     }}
    //   >
    //     <Background
    //       source={{
    //         uri: getTmdbImage(movie?.poster_path, "w500"),
    //       }}
    //       resizeMode="cover"
    //     >
    //       <GradientOverlay
    //         colors={["transparent", "rgba(0,0,0,0.7)"]}
    //         locations={[0.6, 0.85]}
    //         start={{ x: 0, y: 0 }}
    //         end={{ x: 0, y: 1 }}
    //       >
    //         <ContentContainer>
    //           {/* <GenreList list={movie?.genre_ids as number[]} /> */}
    //           <Title>{movie?.title}</Title>
    //         </ContentContainer>
    //       </GradientOverlay>
    //     </Background>
    //   </Container>
    // </Pressable>
  );
};

export default HeroSection;

export const linearColor = [
  "transparent",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.5)",
  "rgba(0,0,0,0.5)",
];
