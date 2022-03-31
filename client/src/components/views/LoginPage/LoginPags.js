import axios from 'axios';
import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

        axios.post('/api/users/login', body)
            .then(respone => {
                
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