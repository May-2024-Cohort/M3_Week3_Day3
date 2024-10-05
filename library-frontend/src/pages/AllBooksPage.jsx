import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/auth.context'

function AllBooksPage() {


  const value = useContext(AuthContext)

  console.log(value)



    const [books,setBooks] = useState([])


    useEffect(()=>{

      const token = localStorage.getItem('token')

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/books`,{headers:{Authorization:`Bearer ${token}`}})
        .then((allBooks)=>{
            console.log(allBooks.data)
            setBooks(allBooks.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    
  return (
    <div>
     <Link to={"/books/create"}><button>Create Book</button></Link> 
      {books.map((oneBook)=>{
        return(
            <div key={oneBook._id} style={{marginTop:'70px'}}>

                <h2>Title: {oneBook.title}</h2>
                <h4>{oneBook.author.name}</h4>
                <h4>{oneBook.author.country}</h4>

                <h6>{oneBook.genre.name}</h6>
                <p>Pages Number: {oneBook.pageNumbers}</p>

            </div>
        )
      })}
    </div>
  )
}

export default AllBooksPage
