import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(true);  

    useEffect(() => {
        const token = Cookies.get("token");
        if(!token){
            setIsLoggedIn(false);
        }
    }, [isLoggedIn]);

    return (
        <AuthContext.Provider value={isLoggedIn} >
            {children}
        </AuthContext.Provider>
    )
}