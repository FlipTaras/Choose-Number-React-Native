import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/colors";

interface CustomButtonProps {
  clickHandler: () => void;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  clickHandler,
}) => {
  let ButtonComponent: any = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={clickHandler}>
        <View style={styles.button}>
          <Text style={styles.text}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: "hidden",
    borderRadius: 25,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  text: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});
