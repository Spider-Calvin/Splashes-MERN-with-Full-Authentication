import React,{useState} from 'react'
import './Login.scss'
import { useNavigate } from "react-router-dom";
import {GoogleLogin} from 'react-google-login'
import {gapi} from "gapi-script"
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AUTH } from '../../Constants/ActionTypes';
import { sign_in, sign_up } from "../../Actions/Login.js";



function Login({setLoggedin}) {
  
    const [email,setEmail]= useState("")
    const [signin, setSignin] = useState(true);
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const initialState = { name: "", email: "", password: ""};
    const [form, setForm] = useState(initialState);

    const client_id =
      "698938958325-te4hprj4aqb47hnd1mesv0n6hauurp3o.apps.googleusercontent.com";

    const Login = ()=> {
        console.log(form)
         if (signin) {
           dispatch(sign_in(form, Navigate));
         } else {
           dispatch(sign_up(form, Navigate));
         }
    }

    const sign_click = ()=>{
      setSignin((prev)=>!prev)
      setForm(initialState)
    }
    
    useEffect(()=>{
      function start(){
        gapi.auth2.init({
          clientId:client_id,
        })
      };
      gapi.load('client:auth2',start);
    });


    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try {
        dispatch({ type: AUTH , data: { result, token } });
        Navigate("/");
      } catch (error) {
        console.log(error);
      }
       
    };

    const googleError = (error) =>{ console.log(error)
      alert("Google Sign In was unsuccessful. Try again later")};


  return (
    <>
      <div className="login_container">
        {signin ? (
          <>
            <div className="app__footer-form app__flex">
              <div className="app__flex">
                <input
                  className="p-text"
                  type="text"
                  placeholder="Email id"
                  name="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="app__flex">
                <input
                  className="p-text"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="login_btns">
              <button type="button" className="p-text" onClick={Login}>
                Login !
              </button>

              <GoogleLogin
                clientId={client_id}
                render={(renderprops) => (
                  <button
                    type="button"
                    className="Google_btn"
                    onClick={renderprops.onClick}
                    disabled={renderprops.disabled}
                    varient="contained"
                  >
                    Continue with Google{" "}
                  </button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            </div>
            <div className="Create_acc_btn">
              Dont have an account ?{" "}
              <b onClick={sign_click}>create a account !</b>
            </div>{" "}
          </>
        ) : (
          <>
            {" "}
            <div className="Sign_up_block">
              <div className="txt_field_Sign_up">
                <input
                  type="text"
                  name="name"
                  required
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
                <span></span>
                <label>User Name</label>
              </div>
              <div className="txt_field_Sign_up">
                <input
                  type="text"
                  required
                  name="email"
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
                <span></span>
                <label>Email id</label>
              </div>
              <div className="txt_field_Sign_up">
                <input
                  type="password"
                  required
                  name="password"
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
                <span></span>
                <label>Password</label>
              </div>
              <div className="txt_field_Sign_up">
                <input
                  type="password"
                  required
                  name='confirmPassword'
                  onChange={(e) =>
                    setForm({ ...form, [e.target.name]: e.target.value })
                  }
                />
                <span></span>
                <label>Confirm Password</label>
              </div>
            </div>
            <div className="login_btns">
              <button type="button" className="p-text" onClick={Login}>
                Create a Account
              </button>
            </div>
            <div className="Create_acc_btn">
              Already have an account ? <b onClick={sign_click}>Sign in!</b>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}

export default Login
