import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom';

const Auth = (SpecificComponent, option, adminRoute = null) => {
    //option
    //null => 아무나 출입 가능한 페이지
    //true => 로그인 한 유저만 출입 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지

    const AuthenticationCheck = (props) => {
        let navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(getAuth())
                .then(response => {
                    console.log(response)
                    if (response.payload.isAuth === false) { //로그인 하지 않은 상태
                        if (option === true) {
                            navigate('/login');
                        }
                    } else { //로그인 한 상태
                        if (adminRoute && !response.payload.isAdmin) {
                            navigate('/');
                        } else if (option === false) {
                            navigate('/');
                        }
                    }
                });
            axios.get('/api/users/auth')
        }, []);

        return(
            <SpecificComponent />
        )
    }

    return <AuthenticationCheck />;
};

export default Auth;