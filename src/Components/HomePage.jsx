import { useState } from "react";
import FilterButtons from "./FilterButtons";
import VideoGrid from "./VideoGrid";
import { videoData } from "./VideoData";
import { useOutletContext } from "react-router-dom";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchText,isOpen } = useOutletContext(); // get searchText from parent



  const filteredVideos = videoData.filter(video => {
    const matchesCategory =
      selectedCategory === "All" ||
      (video.category && video.category.toLowerCase() === selectedCategory.toLowerCase());

    const matchesSearch =
      searchText === "" ||
      (video.title && video.title.toLowerCase().includes(searchText.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <FilterButtons onFilterChange={setSelectedCategory} isOpen = {isOpen}  />
      {filteredVideos.length > 0 ? (
        <VideoGrid videos={filteredVideos} isOpen={isOpen}  />
      ) : (
        <p style={{ position: "absolute", left: "32rem", top: "20rem", fontSize: "2rem" }}>
          No videos found matching your criteria.
        </p>
      )}
    </div>
  );
}

export default HomePage;
