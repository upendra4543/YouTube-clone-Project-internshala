
import React, { useState, useEffect } from "react";
import "../style.css";

function FilterButtons({ onFilterChange,isOpen }) {
  const categories = [
    "All",
    "Web Development",
    "Javascript",
    "Data Science",
    "Music",
    "Podcasts",
    "Information Technology",
    "Live",
    "Show",
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  // Scroll effect for background class toggle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Handle filter click
  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    if (onFilterChange) onFilterChange(category);
  };

  return (
              <div   
                    id="filter-btns"
                    className = {`${scrolled ? "filter-scrolled" : ""} ${isOpen ? "menu-open" : ""}`}
                 >  
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`btn-1 ${selectedCategory === cat ? "active" : ""}`}
                        onClick={() => handleFilterClick(cat)}
                      >
                        {cat}
                      </button>
                    ))}
              </div>
  );
}

export default FilterButtons;
