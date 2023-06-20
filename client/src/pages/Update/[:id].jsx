import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useState } from "react"

export default function Update() {

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

    const bookId = router.asPath.split('/')[2];
    console.log(router.asPath.split('/')[2]);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:8800/books/' + bookId , book);
            router.push('/Books');
        } catch (error) {
            console.log(error);
        }
    }

    return (
      <>
      <div className="form">
        <h1>Update new book</h1>
        <input type="text" placeholder="title" name="title" onChange={ handleChanged } />
        <input type="text" placeholder="desc"  name="desc" onChange={ handleChanged }/>
        <input type="text" placeholder="cover" name="cover" onChange={ handleChanged } />
      </div>
      <button onClick={ handleClick }>Update</button>
      </>
    )
  }
  