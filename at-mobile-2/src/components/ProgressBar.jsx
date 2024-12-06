import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({ progress, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
});

export default ProgressBar;
