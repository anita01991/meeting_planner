import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const styles = {
    maxWidth: 450,
    margin: '0 auto',
    textAlign: 'left',
    marginTop: '3rem',
}
const initalState = {
    UserName: '',
    UserPassword: ''
}
const baseUrl = 'https://onlinetestapi.gerasim.in/api/Meeting'
const Login = () => {
    const [user, setUser] = useState(initalState)
    const [error, setError] = useState('')
    const usernameInput = useRef(null)
    const handleInput = (e) => {
        setUser(pre => {
            return {
                ...pre,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(baseUrl + '/login', user)
        const data = await res.data;
        console.log(data)
        if(data.result) {
            alert('successfully logged in')
            setUser({...initalState})
            setError('')
            usernameInput.current.focus();
        } else {
            setError(data.message)
        }
    }
    return (
        <div className='container'>
            <div style={styles}>
                <h1 className='text-center mb-4'>Login</h1>
                {
                error!=='' &&
                <div className="alert alert-warning" role="alert">
                    {
                        error
                    }
                </div>
                
                }
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input ref={usernameInput} value={user.UserName} onChange={handleInput} name='UserName' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={user.UserPassword} onChange={handleInput} name='UserPassword' type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;