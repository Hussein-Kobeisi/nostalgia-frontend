import '../styles/Register.css'
import '../styles/common.css'
import { useState } from 'react';
import {LoginCard, SignUpCard} from './components/registerCards.jsx'




const Register = () => { 
    const [isLogin, setLogin] = useState(false)
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