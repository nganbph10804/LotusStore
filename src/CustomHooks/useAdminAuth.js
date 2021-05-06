import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { checkUserIsAdmin } from '../Utils';


const UseAdminAuth = () => {

    const currentUser = useSelector(state=>state.user.currentUser);
    const history = useHistory();
    useEffect(()=>{
        if(!checkUserIsAdmin(currentUser)){
            history.push('/login');
        }
    },[currentUser])

    return (
        <div>
            
        </div>
    )
}

export default UseAdminAuth
