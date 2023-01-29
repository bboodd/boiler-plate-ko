//import { Axios } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user-action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler =(event) => {

    setEmail(event.currentTarget.value)
  }
  
  const onPasswordHandler = (event) => {

    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess) {
          navigate('/')
        } else {
          alert('Error')
        }
      })

    // Axios.post('/api/users/login', body)
    // .then(response => {

    //})
  }



  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>

        <form style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler}/>
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>
          <br />
          <button>
            Login
          </button>
        </form>
    </div>
  )
}

export default Auth(LoginPage, false);