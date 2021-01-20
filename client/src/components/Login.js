import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import { logIn, logInGoogle } from '../actions/actionAuth';

import { googleIcon, githubIcon } from './images/icon';

function Login({ logIn, user, logInGoogle }) {
  const history = useHistory();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
   if (!user) {
        history.push('/login');
      } else if (user.role=== 'buyer') {
        history.push('/myorders');
      } else if (user.role === 'admin')
        history.push('/admin');
    // localStorage.setItem('localUser', JSON.stringify(user))
  }, [user]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const login =  () => {
    logIn(input)

    
  };

  const googleLog = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  
  };
  const githubLog = () => {
    window.location.href = 'http://localhost:3000/auth/github';
  
  };

  return (
    <div className='backgroundLogin'>
      <div className='blankSpace'></div>
      <div className='loginCard'>
      <div className='loginContainer'>
        <h3 className='title'>Sign In</h3>
        <form onSubmit={(event) => event.preventDefault()}>
          
            <label className='labelEmailLogin' for="email">Email</label>
            <input
              className='inputEmailLogin'
              name='email'
              type='email'
              id='email'
              
              onChange={handleChange}
            />
          
        

          <label className='labelPasswordLogin' for="password">Password</label>
            <input
              className='inputPasswordLogin'
              name='password'
              type='password'
              id='password'
            
              onChange={handleChange}
            />
            <p className='privacyDisclaimer'>
              We wont share your data with others.
            </p>

        
        </form>


          <button
            id='login'
            onClick={() => {
              console.log('INPUT', input);
              login(input);
            }}
          >
            Sign In

            </button>


            <button value='google' id='googleBtn' onClick={googleLog}>
              <i className='oauth-logo'>{googleIcon}</i> Sign in with Google
            </button>
          
          <button value='github' id='githubBtn' onClick={githubLog}>
              <i className='oauth-logo'>{githubIcon}</i> Sign in with Git Hub
            </button>
          <div className='registro'>
            No account?  no worries...   
            <Link to='/user'>    Get Registered</Link>
          </div>
          </div>
          <div className='blankSpace'></div>
          
      </div>
    </div>

 
  );
}

const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (input) => dispatch(logIn(input)),
  logInGoogle: () => dispatch(logInGoogle()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
