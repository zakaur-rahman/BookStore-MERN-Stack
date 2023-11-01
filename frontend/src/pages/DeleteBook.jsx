import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:8000/books/delete/${id}`);
      
      navigate("/");
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      <BackButton />

      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-200 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are you sure? This action cannot be undone.
        </h3>
        <button
          onClick={() => {
            navigate("/");
          }}
          type="button"
          class="btn btn-secondary me-2"
        >
          Cancel
        </button>
        <button
          onClick={deleteHandler}
          disabled={loading}
          type="submit"
          className="p-4 bg-red-400 text-white m-8 w-full"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
