import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { IoHome } from "react-icons/io5";

const Bookshelf = () => {
  const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate('/')}><IoHome /></button>
      <h1>My Bookshelf</h1>
      {bookshelf.length === 0 ? (
        <p>Your bookshelf is empty. Add some books!</p>
      ) : (
        <ul className="book-list">
          {bookshelf.map((book) => (
            <li key={book.key} className="book-card">
              <h2>Book Title: {book.title}</h2>
              {book.author_name && <p>Author: {book.author_name[0]}</p>} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookshelf;
