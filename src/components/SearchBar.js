import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onQueryChange, resultCount }) => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    setValue(e.target.value);
    onQueryChange(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        <input
          type="text"
          placeholder="Search for a smartphone..."
          value={value}
          onChange={handleInputChange}
          className="search-bar-input"
        />
        <hr className="search-bar-line" />
      </div>
      {resultCount !== undefined && (
        <div className="search-bar-results">{resultCount} results</div>
      )}
    </div>
  );
};

export default SearchBar;
