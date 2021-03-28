import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  style?: { [index: string]: any };
}
export const Input: React.FC<InputProps> = ({ style, ...props }) => {
  return <TextInput {...props} style={{ ...styles.input, ...style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
