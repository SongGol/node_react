import { PromiseProvider } from 'mongoose';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); //설정을 안하면 화면이 refresh

        let body = {
            email: email,
            password: password,
        };

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    navigate('/');
                } else {
                    alert('Error');
                }
            })

        
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', width: '100%', height: '100vh'}}>
                <form style={{display: 'flex', flexDirection: 'column'}}
                    onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={onEmailHandler}/>
                    <label>Password</label>
                    <input type="password" value={password} onChange={onPasswordHandler}/>
                    <button >Login</button>
                </form>
            </div>
        </>
    )
};

export default LoginPage;