import React, { useEffect, useState } from "react";
import Rating from "react-simple-star-rating";
import axios from "axios";
import { toast } from "react-hot-toast";

const NewForm = ({ pins, newPlace, currentUser, setPins, setNewPlace }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);

  const { token, username } = currentUser;

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      user: username,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.post("/api/pin", newPin, config);
      setPins([...pins, res.data]);
      setNewPlace(null);
      toast.success("Place added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />
        <label>Review</label>
        <textarea
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter Description"
        />
        <label>Rating</label>
        <Rating
          onClick={handleRating}
          ratingValue={rating}
          size={20}
          label
          transition
          fillColor="orange"
          emptyColor="gray"
          //  className="foo" // Will remove the inline style if applied
        />
        {/* <select>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select> */}
        <button className="submitButton" type="submit">
          Add Place
        </button>
      </form>
    </div>
  );
};

export default NewForm;
