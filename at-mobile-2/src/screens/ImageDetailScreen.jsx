import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const ImageDetailScreen = ({ route }) => {
  const { image } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: image.hdurl || image.url }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.date}>
          Date: {new Date(image.date).toLocaleString()}
        </Text>
        <Text style={styles.explanation}>{image.explanation}</Text>
        {image.copyright && (
          <Text style={styles.copyright}>© {image.copyright}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: width,
    height: width * 0.75,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  explanation: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  copyright: {
    fontSize: 12,
    color: "#888",
    fontStyle: "italic",
  },
});

export default ImageDetailScreen;
