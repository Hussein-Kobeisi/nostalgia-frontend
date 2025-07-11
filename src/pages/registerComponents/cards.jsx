import {InputsDiv, BtnsDiv, LinksDiv}  from './cardDivs.jsx'

const loginFields = ['Username', 'Password'];
const signUpFields = ['Username', 'Email', 'Mobile', 'Password', 'Confirm Password'];

const loginBtnFields = ['Login', 'Login with Google']

const signUpBtnFields = ['Sign Up', 'Login with Google']

const loginLinkFields = ['Not registered yet? Sign up.', 'Forgot password?']
const signUpLinkFields = ['Already got an account? Login.']

const Nop = () => {}


export const LoginCard = ({setLogin, register}) => {
    const loginLinkFts = [() => setLogin(false), Nop]
    const loginBtnFts = [() => register(), Nop]

    return(
    <div className='registerCard justify-between flex-col items-center'>
        <p className='cardText bold'>Login</p>

        <InputsDiv fields={loginFields}/>

        <BtnsDiv fields={loginBtnFields} clicks={loginBtnFts} />

        <LinksDiv fields={loginLinkFields} clicks={loginLinkFts} />

    </div>
)}

export const SignUpCard = ({setLogin, register}) => {
    const signUpLinkFts = [() => setLogin(true)]
    const signUpBtnFts = [() => register(), Nop]

    return(
    <div className='registerCard justify-between flex-col items-center'>
        <p className='cardText bold'>Sign Up</p>
    
        <InputsDiv divClasses='signCardInputDiv' inputClasses='signCardInput' fields={signUpFields}/>
        
        <BtnsDiv fields={signUpBtnFields} clicks={signUpBtnFts} />

        <LinksDiv fields={signUpLinkFields} clicks={signUpLinkFts} />
    
    </div>
)}