import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ImageCard = ({ image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(image)}>
      <Image
        source={{ uri: image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {image.title}
        </Text>
        <Text style={styles.date}>{new Date(image.date).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});

export default ImageCard;
