import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const initialPost = {
  title: "",
  author: "",
  publishYear: "",
};

const EditBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState(initialPost);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const getBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/books/detail/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, [id]);

  const handleEdit = async () => {
    if (book.title && book.author) {
      setLoading(true);
      try {
        await axios.put(`http://localhost:8000/books/edit/${id}`, book);
        setLoading(false);
        navigate("/");
      } catch (error) {
        console.log("Error creating book", error);
        setLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
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
            value={book.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            name="author"
            value={book.author}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            className="border-2 border-gray-500 px-4 py-2 w-full"
            type="text"
            name="publishYear"
            value={book.publishYear}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={() => handleEdit()}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
