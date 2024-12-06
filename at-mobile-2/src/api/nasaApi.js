import axios from "axios";

const NASA_IMAGE_LIBRARY_URL = "https://images-api.nasa.gov/search";

export const fetchNasaImages = async (page = 1, query = "earth") => {
  try {
    const response = await axios.get(NASA_IMAGE_LIBRARY_URL, {
      params: {
        q: query,
        media_type: "image",
        page: page,
        page_size: 10,
      },
    });

    const transformedImages = response.data.collection.items
      .filter(item => item.links && item.links[0]?.href)
      .map(item => {
        const metadata = item.data[0];
        const links = item.links?.[0];

        return {
          title: metadata.title,
          date: metadata.date_created,
          url: links?.href,
          hdurl: links?.href,
          explanation: metadata.description,
          copyright: metadata.photographer || "NASA",
          nasa_id: metadata.nasa_id,
        };
      });

    return {
      images: transformedImages,
      totalPages: Math.ceil(response.data.collection.metadata.total_hits / 10),
    };
  } catch (error) {
    console.error("Error fetching NASA images:", error);
    throw error;
  }
};
