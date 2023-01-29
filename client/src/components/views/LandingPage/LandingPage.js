import React,{ useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';
//import { auth } from '../_actions/user-action';
function LandingPage() {
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response => {
            if(response.data.success) {
                navigate('/login')
            } else {
                alert('logout false')
            }
        })
    }
  
    return (
    <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: '100%', height: '100vh'
    }}>
        <h2>start</h2>

        <button onClick={onClickHandler}>
            logout
        </button>


    </div>
  )
}

export default Auth(LandingPage , null);