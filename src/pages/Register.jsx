import '../styles/Register.css'
import '../styles/common.css'
import { useState } from 'react';
import {LoginCard, SignUpCard} from '../pages/registerComponents/cards.jsx'

// import './registerComponents/components.jsx'




const Register = () => { 
    const [isLogin, setLogin] = useState(false)
    const login = () => {console.log("login")}
    const signup = () => {console.log("signup")}

    
    return(
    <div className="main items-center fullscreen">

        <p className='title'>Nostalgia</p>

        {isLogin ?  <LoginCard setLogin={setLogin} register={login}/> : 
                    <SignUpCard setLogin={setLogin} register={signup}/>}

    </div>
)}

export default Register;