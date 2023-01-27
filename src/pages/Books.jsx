import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //async if not will get err and remember to always await an async function where setbooks is below first console.log to make sure backend is actually sending data
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks(); //call the function after making it
  }, []); //dont forget to put an empty array

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>TFT Book Shop</h1>
      <div className="books">
        {/*when using map have to put key*/}
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <button className="addtoo">
        <Link to="/add" className="addto">
          Add new book
        </Link>
      </button>
    </div>
  );
};
//if no cover its fine if it is itll implement 1 with book.cover
// mapping thru the books area to make a div for each of them and generate an img
export default Books;
