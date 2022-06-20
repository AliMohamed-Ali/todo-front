import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React,{useEffect,useState} from 'react';

function App() {
  const [user,setUser]= useState(null);
  
  const login = ({username,password})=>{
    axios.post(process.env.REACT_APP_BACKEND_URL +"/users/login",{
      username,
      password
    }).then((res)=>{
      if(res.data.user){
        setUser(res.data.user)
      }else{
        throw new Error(res.data.message)
      }
    }).catch((err)=>{
      console.error(err);
    })
  }
  const onFormSubmit=(e)=>{
    e.preventDefault();
    const {username:{value:username},
    password:{value:password}}= e.target;
    login({username,password})
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form onSubmit={onFormSubmit}>
        <input type="text" name='username'/>
        <input type="text" name='password'/>
        <button type='submit'>login</button>
      </form>
      {user&&(
        <>
        <label>Age</label>:{user.age}
        <label>Username</label>:{user.username}
        </>
      )}
      </header>
      
    </div>
  );
}

export default App;
