import React, { useState, useEffect } from 'react';
import { fetchPhones, searchPhones } from '../services/apiService';
import PhoneCard from '../components/PhoneCard';
import SearchBar from '../components/SearchBar';
import './PhoneList.css';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data = await fetchPhones();
        setPhones(data);
      } catch (err) {
        setError(err.message);
      } finally {
      }
    };
    loadPhones();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      try {
        if (query.trim() !== '') {
          const data = await searchPhones(query);
          setPhones(data);
        } else {
          const data = await fetchPhones();
          setPhones(data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    performSearch();
  }, [query]);

  return (
    <div>
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        resultCount={phones.length}
      />
      <div className="phone-list-grid">
        {phones.map((phone, index) => (
          <PhoneCard key={`${phone.id}-${index}`} phone={phone} />
        ))}
      </div>
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

export default PhoneList;
