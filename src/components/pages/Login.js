import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/signup');
  }

  return (
    <div>
      <header>Login Page</header>
      <form className='loginForm' id='loginForm'>
        <input
          type='text'
          id='username'
          name='username'
          placeholder='Enter Username'
        />
        <input
          type='password'
          id='password'
          name='password'
          placeholder='Enter Password'
        />

        <button
          onClick={() => {
            fetch('/login', {
              method: 'POST',
              body: new FormData(document.getElementsByClassName(loginForm)),
            })
              .then((res) => {
                console.log('login onClick invoked');
                res.json();
              })
              .then((data) => console.log(data));
          }}
        >
          Login
        </button>
        {/* //Login button makes fetch request onClick, if truthy links to /settings */}
      </form>

      <button onClick={handleClick}>Sign up</button>

      <Link to='/scrum'>Scrum</Link>
      <Link to='/settings'>Settings</Link>
    </div>
  );
}

export default Login;
