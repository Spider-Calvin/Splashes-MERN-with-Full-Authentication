import React  from 'react'
import "./Navbar.scss"
import { GiWaterSplash } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import { useNavigate , useLocation} from "react-router-dom";
import { DiGhostSmall } from "react-icons/di";
import { useEffect, useState } from "react";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

function Navbar({loggedin, setLoggedin ,setCurrentId}) {
const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));    
const Navigate = useNavigate();
const Location = useLocation();
const dispatch = useDispatch();

const go_to_form = () => {
      Navigate("/form");
      setCurrentId(null);
    };

const go_to_login = () => {
      Navigate("/login");
    };

const logout= () =>{
    dispatch({type:'LOG_OUT'});
    setUser(null)
}    

useEffect(() => {
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) ;
  }

  setUser(JSON.parse(localStorage.getItem("profile")));
}, [Location]);
return (
  <>
    <h1 className="app__tittle">
      <GiWaterSplash />
      &nbsp; Splashes
    </h1>

    <div className="form_navigator">
      <div className="form_navigator_name">
        {user ? (
          <>
            logged in as &nbsp; <h3>{user?.result.name}</h3>
          </>
        ) : (
          false
        )}
      </div>
      <div className="form_navigator_icon">
        <DiGhostSmall
          className={user ? "fni_form" : false}
          onClick={
            user?.result.name
              ? go_to_form
              : () => {
                  alert("You Should Login to make changes");
                }
          }
        />
        <BiLogIn
          className={user ? "fni_form" : false}
          onClick={user ? logout : go_to_login}
        />{" "}
        <b
          className={user ? "fni_form" : false}
          onClick={user ? logout : go_to_login}
        >
          {" "}
          {user?.result ? "logout" : "login"}
        </b>
      </div>
    </div>
  </>
);
}

export default Navbar
