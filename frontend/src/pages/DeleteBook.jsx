import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [title,setTitle] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5000/books/${id}`)
    .then(() =>{
      setLoading(false);
      navigate('/');
    })
    .catch((err) => {
      setLoading(false);
      alert("ERROR OCURRED");
      console.log(err);
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4 '> Delete Book</h1>
      {loading ? <Spinner/> : ('')}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl '>Are you sure you want to delete "{title}"</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
          Delete
        </button>
      
      </div>
    </div>
  )
}

export default DeleteBook