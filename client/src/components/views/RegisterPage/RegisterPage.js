//import { Axios } from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user-action';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")


  const onEmailHandler =(event) => {
    setEmail(event.currentTarget.value)
  }
  
  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert('Password is not equal')
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success) {
          navigate('/login')
        } else {
          alert('Failed to sign up')
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
          
          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler}/>
          
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>
          
          <label>Confirm Password</label>
          <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
          <br />
          <button>
            Register
          </button>
        </form>
    </div>
  )
}

export default Auth(RegisterPage, false);