import React, { useState, useEffect } from 'react';
import { fetchPhones, searchPhones } from '../services/apiService';
import PhoneCard from '../components/PhoneCard';
import SearchBar from '../components/SearchBar';
import './PhoneList.css';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [resultCount, setResultCount] = useState(0);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const data = await fetchPhones();
        setPhones(data);
        setResultCount(data.length);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadPhones();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        if (query.trim() === '') {
          const data = await fetchPhones();
          setPhones(data);
          setResultCount(data.length);
        } else {
          const data = await searchPhones(query);
          setPhones(data);
          setResultCount(data.length);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SearchBar query={query} onQueryChange={setQuery} resultCount={resultCount} />
      <div className="phone-list-grid">
        {phones.map((phone, index) => (
          <PhoneCard key={`${phone.id}-${index}`} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default PhoneList;