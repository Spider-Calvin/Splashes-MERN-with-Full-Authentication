import './App.scss';
import { useState , useEffect } from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';


import Posts from "./Components/Posts/Posts";
import Form from "./Components/Form/Form.jsx";
import { useDispatch } from 'react-redux';
import { getPosts } from "./Actions/Posts";
import Loader from './Components/Loader/Loader';
import Login from './Components/Login/Login';



const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
 
  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch])

  return (
    <>
      <Navbar
        setCurrentId={setCurrentId}
      />
      <Routes>
        <Route
          path="/"
          element={<Posts setCurrentId={setCurrentId}  />}
        />
        <Route
          path="/form"
          element={<Form currentId={currentId} setCurrentId={setCurrentId} />}
        />
        <Route path="/login" element={<Login/>} />
        {/* <Loader/> */}
      </Routes>
    </>
  );
};

export default App;