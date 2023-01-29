//import axios, { Axios } from 'axios';
import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user-action';
import { useNavigate } from 'react-router-dom';


export default function authFunc(SpecificComponent, option, adminRoute = null) {

    //null => �ƹ��� ���� ������ ������
    //true => �α����� ������ ���� ������ ������
    //false => �α����� ������ ���� �Ұ����� ������



    function AuthenticationCheck() {

        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            
            dispatch(auth()).then(response => {
                console.log(response)

                //�α��� ���� ���� ����
                if(!response.payload.isAuth){
                    if(option) {
                        navigate('/login')
                    }

                } else {
                    //�α��� �� ����
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    } else {
                        if(option === false) {
                            navigate('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }



    return AuthenticationCheck
}
