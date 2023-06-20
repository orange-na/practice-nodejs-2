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

    const handleDlete = async (id) => {
        try {
            await axios.delete('http://localhost:8800/books/' + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className="container mx-auto text-center">
            <h1 className="text-6xl my-14">Yuto Book Shop</h1>
            <div className="flex justify-center gap-5 text-center mb-8">
                {books.map((book) => {
                    return(
                        <div className="flex flex-col gap-2" key={ book.id }>
                            <img src={book.cover} alt="" className="w-40 h-60 bg-blue-400"/>
                            <h2>{ book.title }</h2>
                            <p>{ book.desc }</p>
                            <button onClick={ ()=>handleDlete(book.id) } className="delete bg-red-400 px-2 py-1 rounded-lg text-white">Delete</button>
                            <button className="update bg-green-500 px-2 py-1 rounded-lg text-white"><Link href={`/Update/${book.id}`}>Update</Link></button>
                        </div>
                    )
                })}
            </div>
            <button><Link href='/Add' className="bg-orange-300 px-5 py-3 rounded-lg text-white">Add new book</Link></button>
        </div>
    ) 
  }
  