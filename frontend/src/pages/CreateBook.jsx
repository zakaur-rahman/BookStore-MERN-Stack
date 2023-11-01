import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialPost = {
  title: "",
  author: "",
  publishYear: "",
};

const CreateBook = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPost);
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (post.title && post.author) {
      setLoading(true);
      try {
        await axios.post(`http://localhost:8000/books/create`, post);
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.log("Error creating book", error);
        setLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            name="title"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            name="author"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            name="publishYear"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={() => handleBook()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
