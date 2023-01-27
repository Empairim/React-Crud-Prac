import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  //  ***** used to find the above data ^^^^ console.log(location.pathname.split("/")[2]) //using this to take the id from console log so we know what specific book to update using split function to cut the sentence into pieces and put it in an array. its 3rd item so index is 2

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }; // preventDefault stops the reload of page when clicking the button navigate takes us to home page if the updating is successul put method to add info in to something thats alrdy there updating the values and specify id EZ using react router dom use location hook

  console.log(book);
  return (
    <div className="form">
      <h1>Update the Book</h1>{" "}
      {/* make sure the names match the state names then create the handleChange function sothings update */}
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="desc"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formBtn" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};
//then make a handleClick function to send the new data to our backend
export default Update;
