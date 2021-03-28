import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  // ScrollView,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { NumberContainer } from "../components/NumberContainer";
import { TitleText } from "../components/TitleText";
import { Ionicons } from "@expo/vector-icons";

import * as ScreenOrientation from "expo-screen-orientation";

const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number
): any => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndm = Math.floor(Math.random() * (max - min)) + min;
  if (rndm === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndm;
  }
};
interface GameScreenProps {
  userChoise: number;
  onGameOver: (num: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  userChoise,
  onGameOver,
}) => {
  const initialGuess = generateRandomBetween(1, 100, userChoise);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  // const [rounds, setRounds] = useState<number>(0);
  const [pastGuesses, setPastGuesses] = useState<string[]>([initialGuess]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);
  useEffect(() => {
    const updateLayout = () => {
      setWidth(Dimensions.get("window").width);
      setHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => Dimensions.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    if (currentGuess === userChoise) {
      // onGameOver(rounds);
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoise, onGameOver]);

  const nextGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < userChoise) ||
      (direction === "greater" && currentGuess > userChoise)
    ) {
      return Alert.alert("Don't lie", "You know this is wrong... ", [
        { style: "cancel", text: "Sorry!" },
      ]);
    } else {
      if (direction === "lower") {
        currentHigh.current = currentGuess;
      } else {
        currentLow.current = currentGuess + 1;
      }

      const newNumber = generateRandomBetween(
        currentLow.current,
        currentHigh.current,
        currentGuess
      );

      setCurrentGuess(newNumber);
      // setRounds((prevState) => prevState + 1);
      setPastGuesses((prevState) => [newNumber.toString(), ...prevState]);
    }
  };

  const renderItems = (
    listLengh: number,
    itemData: ListRenderItemInfo<string>
  ) => {
    return (
      <View style={styles.listItem}>
        <Text>#{listLengh - itemData.index}</Text>
        <Text>{itemData.item}</Text>
      </View>
    );
  };

  if (height < 500) {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <View style={styles.controls}>
          <CustomButton clickHandler={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={20} color="white" />
          </CustomButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <CustomButton clickHandler={() => nextGuessHandler("greater")}>
            <Ionicons name="md-add" size={20} color="white" />
          </CustomButton>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderItems.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <TitleText>Opponent's Guess</TitleText>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card style={styles.buttonsContainer}>
          <CustomButton clickHandler={() => nextGuessHandler("lower")}>
            <Ionicons name="md-remove" size={20} color="white" />
          </CustomButton>
          <CustomButton clickHandler={() => nextGuessHandler("greater")}>
            <Ionicons name="md-add" size={20} color="white" />
          </CustomButton>
        </Card>
        <View style={styles.listContainer}>
          {/* <ScrollView>
            {pastGuesses.map((el, i) => (
              <View key={i} style={styles.listItem}>
                <Text>#{pastGuesses.length - i}</Text>
                <Text>{el}</Text>
              </View>
            ))}
          </ScrollView> */}

          <FlatList
            keyExtractor={(item) => item}
            data={pastGuesses}
            renderItem={renderItems.bind(this, pastGuesses.length)}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get("window").width > 350 ? "60%" : "80%",
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
  },
});
