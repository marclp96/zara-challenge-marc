import React from "react";
import "./SearchBar.css";

const SearchBar = ({ query, onQueryChange, resultCount }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a smartphone..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <span className="search-result-count">{resultCount} resultados</span>
    </div>
  );
};

export default SearchBar;
