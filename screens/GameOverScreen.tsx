import React from "react";
import {
  Button,
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { BodyText } from "../components/BodyText";
import { CustomButton } from "../components/CustomButton";
import { TitleText } from "../components/TitleText";
import Colors from "../constants/colors";

interface GameOverScreenProps {
  rounds: number;
  userNumber: number | null;
  onReset: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  rounds,
  userNumber,
  onReset,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.view}>
      <View style={styles.screen}>
        <TitleText>The Game Is Over</TitleText>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.bodyText}>
            Your phone needed <Text style={styles.highlight}>{rounds}</Text>{" "}
            rounds to guess the number{" "}
            <Text style={styles.highlight}>{userNumber}</Text>
          </BodyText>
        </View>

        <CustomButton clickHandler={onReset}>NEW GAME</CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    // flexGrow: 1,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get("window").height / 30,
  },

  image: {
    width: "100%",
    height: "100%",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginVertical: Dimensions.get("window").height / 60,
  },
  bodyText: {
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
  },
  highlight: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
});
