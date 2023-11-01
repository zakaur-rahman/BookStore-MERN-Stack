import React,{ useEffect, useState } from 'react'
import Spinner from "../components/Spinner";
import BackButton from '../components/BackButton'
import { useParams } from "react-router-dom";
import axios from 'axios';




const ShowBook = () => {

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
    
        const getBook = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/books/detail/${id}`);
            setBook(response.data);
          } catch (error) {
            console.log("Error", error);
          } finally {
            setLoading(false);
          }
        };
        getBook();
      }, [id]);
  return (
    <div className="p-4">
        <BackButton/>
        <h1 className="text -3xl my-4">Show Book</h1>
        {loading ? (
            <Spinner />
        ):(
            <div className = 'flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4' >
                <div className= 'my-4'>
                    <span className = "text-xl mr-4 text-gray-500">Id</span>
                    <span>{book._id}</span>
                </div>
                <div className= 'my-4'>
                    <span className = "text-xl mr-4 text-gray-500">Title</span>
                    <span>{book.title}</span>
                </div>
                <div className= 'my-4'>
                    <span className = "text-xl mr-4 text-gray-500">Author</span>
                    <span>{book.author}</span>
                </div>
                <div className= 'my-4'>
                    <span className = "text-xl mr-4 text-gray-500">Publish Year</span>
                    <span>{book.publishYear}</span>
                </div>
            </div>
        )}
    </div>
  )
}

export default ShowBook