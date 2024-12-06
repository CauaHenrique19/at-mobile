import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";

const CELESTIAL_BODIES = [
  "earth",
  "moon",
  "sun",
  "mars",
  "jupiter",
  "saturn",
  "venus",
  "mercury",
  "neptune",
  "uranus",
  "solar system",
  "galaxy",
  "nebula",
];

const CelestialBodySearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("earth");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = query => {
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(false);
  };

  const renderSuggestionButtons = () => {
    return CELESTIAL_BODIES.filter(body =>
      body.toLowerCase().includes(searchQuery.toLowerCase())
    ).map(body => (
      <TouchableOpacity
        key={body}
        style={styles.suggestionButton}
        onPress={() => handleSearch(body)}
      >
        <Text style={styles.suggestionText}>{body}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Procure"
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(searchQuery)}
        >
          <Text style={styles.searchButtonText}>Procurar</Text>
        </TouchableOpacity>
      </View>

      {showSuggestions && (
        <ScrollView
          horizontal
          style={styles.suggestionsContainer}
          showsHorizontalScrollIndicator={false}
        >
          {renderSuggestionButtons()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  suggestionsContainer: {
    marginTop: 10,
  },
  suggestionButton: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  suggestionText: {
    color: "#333",
  },
});

export default CelestialBodySearch;
