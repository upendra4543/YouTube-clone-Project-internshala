
import { useState, useEffect } from "react";
import FilterButtons from "./FilterButtons";
import VideoGrid from "./VideoGrid";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchText, isOpen } = useOutletContext();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view videos.");
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get("http://localhost:5300/api/videos", config);
        setVideos(response.data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      selectedCategory === "All" ||
      (video.category && video.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      searchText === "" ||
      (video.title && video.title.toLowerCase().includes(searchText.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <FilterButtons onFilterChange={setSelectedCategory} isOpen={isOpen} />
      {filteredVideos.length > 0 ? (
        <VideoGrid videos={filteredVideos} isOpen={isOpen} />
      ) : (
        <p style={{ position: "absolute", left: "32rem", top: "20rem", fontSize: "2rem" }}>
          No videos found matching your criteria.
        </p>
      )}
    </div>
  );
}

export default HomePage;
