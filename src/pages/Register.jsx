import '../styles/Register.css'
import '../styles/common.css'
import { useState } from 'react';
import {LoginCard, SignUpCard} from './components/registerCards.jsx'
import { useSearchParams } from 'react-router-dom';



const Register = () => { 
    const [searchParams] = useSearchParams();
    const loginParam = (searchParams.get("login") == "true");

    const [isLogin, setLogin] = useState(loginParam)
    const login = () => {console.log("login")}
    const signup = () => {console.log("signup")}
    
    return(
    <div className="mainPage regPage">

        <p className='regTitle'>Nostalgia</p>

        {isLogin ?  <LoginCard setLogin={setLogin} register={login}/> : 
                    <SignUpCard setLogin={setLogin} register={signup}/>}

    </div>
)}

export default Register;