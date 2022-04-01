import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault(); //설정을 안하면 화면이 refresh

        if (password !== confirmPassword) {
            return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
        }

        let body = {
            email: email,
            name: name,
            password: password,
            confirmPassword: confirmPassword,
        };

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    navigate('/login');
                } else {
                    alert('Failed to sign up');
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

                    <label>Name</label>
                    <input type="text" value={name} onChange={onNameHandler}/>

                    <label>Password</label>
                    <input type="password" value={password} onChange={onPasswordHandler}/>

                    <label>ComfirmPassword</label>
                    <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}/>

                    <br />
                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
};

export default RegisterPage;