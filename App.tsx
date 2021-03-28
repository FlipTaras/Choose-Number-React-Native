import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Header } from "./components/Header";
import { GameOverScreen } from "./screens/GameOverScreen";
import { GameScreen } from "./screens/GameScreen";
import { StartGameScreen } from "./screens/StartGameScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState<number | null>(null);
  const [rounds, setRounds] = useState<number>(0);

  const [loaded, setLoaded] = useState<boolean>(false);

  if (!loaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(err) => console.log(err)}
        onFinish={() => setLoaded(true)}
      />
    );
  }

  const resetGameHandler = () => {
    setUserNumber(null);
    setRounds(0);
  };
  const startGameHandler = (num: number) => {
    setUserNumber(num);
  };

  const gameOverHandler = (numOfRounds: number) => {
    setRounds(numOfRounds);
  };
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {rounds <= 0 && userNumber ? (
        <GameScreen userChoise={userNumber} onGameOver={gameOverHandler} />
      ) : (
        rounds <= 0 && <StartGameScreen onStartGame={startGameHandler} />
      )}
      {rounds > 0 && (
        <GameOverScreen
          onReset={resetGameHandler}
          userNumber={userNumber}
          rounds={rounds}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
