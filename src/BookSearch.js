import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css';

const BookSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
          setSearchResults(response.data.docs);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const addBookToShelf = (book) => {
    const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    if (!bookshelf.some(b => b.key === book.key)) {
      bookshelf.push(book);
      localStorage.setItem('bookshelf', JSON.stringify(bookshelf));
    }
  };

  return (
    <div className="container">
      <h1>Search by book name:</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search for a book"
        className="search-input"
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="book-list">
          {searchResults.map((book) => (
            <li key={book.key} className="book-card">
              <h2>Book Title: {book.title}</h2>
              {book.author_name && <p>Author: {book.author_name[0]}</p>}
              <button onClick={() => addBookToShelf(book)}>Add to Bookshelf</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/bookshelf')}>My Bookshelf</button>
    </div>
  );
};

export default BookSearch;
