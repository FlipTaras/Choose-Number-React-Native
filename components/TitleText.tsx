import React from "react";
import { StyleSheet, Text } from "react-native";

interface TitleTextProps {
  style?: any;
}

export const TitleText: React.FC<TitleTextProps> = ({ children, style }) => {
  return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
