import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react"

export default function Add() {

    const [book, setBook] = useState({
        title:"",
        desc:"",
        cover:"",
    });

    const router = useRouter();

    const handleChanged = useCallback((e) => {
        setBook((prev) => ({...prev, [e.target.name]: e.target.value}));
        console.log(book);
    },[book])

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8800/books', book);
            router.push('/Books');
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <>
      <div className="form">
        <h1>Add new book</h1>
        <input type="text" placeholder="title" name="title" onChange={ handleChanged } />
        <input type="text" placeholder="desc"  name="desc" onChange={ handleChanged }/>
        <input type="text" placeholder="cover" name="cover" onChange={ handleChanged } />
      </div>
      <button onClick={ handleClick }>Add</button>
      </>
    )
  }
  