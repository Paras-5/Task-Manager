import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const apiUrl = process.env.REACT_APP_API_URL;

const Add = () => {

  const users = {
    title:"",
    description:"",
  }

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) =>{
      const {name, value} = e.target;
      setUser({...user, [name]:value});
  }

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post(`${apiUrl}/api/create`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
  }


  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Add new Task</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="title">Title</label>
                <input type="text" onChange={inputHandler} id="title" name="title" autoComplete='off' placeholder='Enter Title' />
            </div>
            <div className="inputGroup">
                <label htmlFor="description">Description</label>
                <input type="text" onChange={inputHandler} id="description" name="description" autoComplete='off' placeholder='Enter Description' />
            </div>
            <div className="inputGroup">
                <button type="submit">Add Task</button>
            </div>
        </form>
    </div>
  )
}

export default Add