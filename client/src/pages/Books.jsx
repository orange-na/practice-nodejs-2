import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"


export default function Books() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get('http://localhost:8800/books');
                setBooks(res.data);
                console.log(res);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllBooks();
    },[])


    return (
        <div>
            <h1>Yuto Book Shop</h1>
            <div className="books">
                {books.map((book) => {
                    return(
                        <div className="book" key={ book.id }>
                            <img src={book.cover} alt="" />
                            <h2>{ book.title }</h2>
                            <p>{ book.desc }</p>
                        </div>
                    )
                })}
            </div>
            <button><Link href='/Add' className="bg-blue-400 px-2 py-1 roun">Add new book</Link></button>
        </div>
    ) 
  }
  