import React from "react";
import { StyleSheet, Text } from "react-native";

interface BodyTextProps {
  style?: any;
}

export const BodyText: React.FC<BodyTextProps> = ({ children, style }) => {
  return <Text style={{ ...styles.body, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  body: {
    fontFamily: "open-sans",
  },
});
