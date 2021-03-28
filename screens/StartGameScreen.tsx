import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { BodyText } from "../components/BodyText";
import { Card } from "../components/Card";
import { CustomButton } from "../components/CustomButton";
import { Input } from "../components/Input";
import { NumberContainer } from "../components/NumberContainer";
import { TitleText } from "../components/TitleText";
import Colors from "../constants/colors";

interface StartGameScreenProps {
  onStartGame: (num: number) => void;
}

export const StartGameScreen: React.FC<StartGameScreenProps> = ({
  onStartGame,
}) => {
  const [number, setNumber] = useState<string>("");
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<undefined | number>();

  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const layoutChange = () => {
    setButtonWidth(Dimensions.get("window").width / 4);
  };

  useEffect(() => {
    Dimensions.addEventListener("change", layoutChange);
    return () => Dimensions.removeEventListener("change", layoutChange);
  }, []);

  const inputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setNumber(e.nativeEvent.text.toString().replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setNumber("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosen = parseInt(number);
    if (isNaN(chosen) || chosen <= 0 || chosen > 99) {
      return Alert.alert(
        "Invalid Number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "OK", style: "destructive", onPress: resetInputHandler }]
      );
    }
    setConfirmed(true);
    setNumber("");
    setSelectedNumber(chosen);
    Keyboard.dismiss();
  };

  let confirmedContent;

  if (confirmed) {
    confirmedContent = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected</BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <CustomButton
          clickHandler={() =>
            onStartGame(
              typeof selectedNumber === "number" ? selectedNumber : -1
            )
          }
        >
          START GAME
        </CustomButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Select a number</BodyText>
              <Input
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                style={styles.input}
                onChange={inputHandler}
                value={number}
              />
              <View style={styles.buttonsContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.primary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.secondary}
                  />
                </View>
              </View>
            </Card>
            {confirmedContent}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    marginVertical: 10,
  },
  inputContainer: {
    // width: 300,
    width: "80%",
    maxWidth: "95%",
    minWidth: 300,
    alignItems: "center",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   // width: 100,
  //   width: Dimensions.get("window").width / 4,
  // },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
