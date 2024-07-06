import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {

 const users = {
    title: "",
    description: ""
 }

 const {id} = useParams();
 const navigate = useNavigate();
 const [user, setUser] = useState(users);

 const inputChangeHandler = (e) =>{
    const {name, value} = e.target;
    setUser({...user, [name]:value});
    console.log(user);
 }

 useEffect(()=>{
    axios.get(`http://localhost:8000/api/getone/${id}`)
    .then((response)=>{
        setUser(response.data)
    })
    .catch((error)=>{
        console.log(error);
    })
 },[id])


 const submitForm = async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/update/${id}`, user)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/")
    })
    .catch(error => console.log(error))
 }

  return (
    <div className='addUser'>
        <Link to={"/"}>Back</Link>
        <h3>Update Task</h3>
        <form className='addUserForm' onSubmit={submitForm}>
            <div className="inputGroup">
                <label htmlFor="title">Title</label>
                <input type="text" value={user.title} onChange={inputChangeHandler} id="title" name="title" autoComplete='off' placeholder='Title' />
            </div>
            <div className="inputGroup">
                <label htmlFor="description">Description</label>
                <input type="text" value={user.description} onChange={inputChangeHandler} id="description" name="description" autoComplete='off' placeholder='Enter Description' />
            </div>
            <div className="inputGroup">
                <button type="submit">Update Task</button>
            </div>
        </form>
    </div>
  )
}

export default Edit