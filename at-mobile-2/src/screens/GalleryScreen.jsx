import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from "react-native";
import { fetchNasaImages } from "../api/nasaApi";
import ImageCard from "../components/ImageCard";
import ProgressBar from "../components/ProgressBar";
import CelestialBodySearch from "../components/CelestialBodySearch";

const { width } = Dimensions.get("window");

const GalleryScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentQuery, setCurrentQuery] = useState("earth");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const allImagesLoadedRef = useRef(false);

  const loadImages = async (query, isRefresh = false) => {
    try {
      setError(null);

      if (isRefresh) {
        setRefreshing(true);
        setPage(1);
        allImagesLoadedRef.current = false;
      } else {
        setIsLoadingMore(true);
      }

      const { images: fetchedImages, totalPages } = await fetchNasaImages(
        isRefresh ? 1 : page,
        query
      );

      if (page >= totalPages) {
        allImagesLoadedRef.current = true;
      }

      const newImages = isRefresh
        ? fetchedImages
        : [...images, ...fetchedImages];

      setImages(newImages);
      setTotalPages(totalPages);
      setPage(prevPage => (isRefresh ? 1 : prevPage + 1));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    loadImages(currentQuery);
  }, [currentQuery]);

  const onRefresh = useCallback(() => {
    loadImages(currentQuery, true);
  }, [currentQuery]);

  const handleLoadMore = () => {
    if (!isLoadingMore && !allImagesLoadedRef.current && page <= totalPages) {
      loadImages(currentQuery);
    }
  };

  const handleSearch = query => {
    setCurrentQuery(query);
    setImages([]);
    setPage(1);
    allImagesLoadedRef.current = false;
  };

  const handleImagePress = image => {
    navigation.navigate("ImageDetail", { image });
  };

  const renderFooter = () => {
    if (allImagesLoadedRef.current) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Sem mais imagens para carregar</Text>
        </View>
      );
    }

    if (isLoadingMore) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return null;
  };

  const progressPercentage = (page / totalPages) * 100;

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error loading images: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CelestialBodySearch onSearch={handleSearch} />

      <ProgressBar progress={progressPercentage} style={styles.progressBar} />

      <Text style={styles.titleText}>
        Imagens de {currentQuery.toUpperCase()}
      </Text>

      <FlatList
        data={images}
        keyExtractor={(item, index) => item.nasa_id || index.toString()}
        renderItem={({ item }) => (
          <ImageCard
            image={item}
            onPress={handleImagePress}
            style={styles.imageCard}
          />
        )}
        contentContainerStyle={styles.listContainer}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0000ff"]}
            tintColor="#0000ff"
          />
        }
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={21}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 15,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  footerContainer: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#888",
    fontSize: 16,
  },
  progressBar: {
    width: width,
    height: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  imageCard: {
    marginBottom: 10,
  },
});

export default GalleryScreen;
