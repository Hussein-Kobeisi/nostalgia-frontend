import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as API from '../apis/apis'
import ClipLoader from "react-spinners/ClipLoader";
import { renderInputFields, handleInputChangeTemplate, handleSubmitFactory } from '../utils/registerUtils';

export const LoginCard = ({setLogin, register}) => {
    const navigate = useNavigate();
    const inputFields = ['email', 'password']
    const {inputs, errors, loading, handleInputChange, handleSubmit} = useLoginForm(() => navigate('/publicwall'));

    return(
        <div className='registerCard justify-between flex-col items-center'>
            <p className='cardText bold'>Login</p>

            <div className='flex-col items-center'>    
            {renderInputFields({inputFields, inputs, errors, handleInputChange, isSignup:false})}
            </div>

            <div className='flex-col items-center'>
                <ClipLoader loading={loading} size={35} />
                {errors['404'] && <p className="inputErrorMsg">{errors['404']}</p>}
                <button className="cardBtn" onClick={handleSubmit}>Login</button>
                <button className="cardBtn">Login with Google</button>
            </div>

            <div className='flex-col items-center'>
                <p className='cardLink' onClick={() => setLogin(false)}>Not registered yet? Sign up.</p>
                <p className='cardLink'>Forgot password?</p>
            </div>
        </div>
)}

export const SignUpCard = ({setLogin, register}) => {
    const navigate = useNavigate();
    const inputFields = ['username', 'email', 'password', 'confirmPassword']
    const {inputs, errors, loading, handleInputChange, handleSubmit} = useSignupForm(() => navigate('/publicwall'));


    return(
    <div className='registerCard justify-between flex-col items-center'>
        <p className='cardText bold'>Sign Up</p>

        <div className='flex-col items-center'>    
           {renderInputFields({inputFields, inputs, errors, handleInputChange, isSignup:true })}
        </div>
        <ClipLoader loading={loading} size={35} />
        <div className='flex-col items-center'>
            {errors['400'] && <p className="inputErrorMsg">{errors['400']}</p>}
            <button className="cardBtn signUpBtnFields" onClick={handleSubmit}>Sign Up</button>
            <button className="cardBtn signUpBtnFields">Login with Google</button>
        </div>

        <div className='flex-col items-center'>
            <p className='cardLink signUpLinkFields' onClick={() => setLogin(true)}>Already got an account? Login.</p>
        </div>   
    </div>
)}


//functions
function callSignupApi(loading, setLoading, setErrors, username, email, password, onSuccess) {
    
    if (loading) return;
    setLoading(true);
    axios
        .post(API.signupApi, {
            name: username,
            email: email,
            password: password,
        })
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.authorisation.token));
            onSuccess();
            setLoading(false);
        })
        .catch((error) => {
            setErrors({ '400': error.response?.data?.message || 'Signup failed' });
            setLoading(false);
        });
}

function callLoginApi(loading, setLoading, setErrors, email, password, onSuccess) {
    
    if (loading) return;
    setLoading(true);
    axios
        .post(API.loginApi, {
            email: email,
            password: password
        })
        .then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('token', JSON.stringify(response.data.authorisation.token));
            onSuccess();
            setLoading(false);
        })
        .catch((error) => {
            setErrors({'404':'Incorrect Email or Password'})
            setLoading(false)
        });
}

//custom Hooks
const useSignupForm = (onSuccess) => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = handleInputChangeTemplate(setInputs, setErrors, '400');

    const handleSubmit = handleSubmitFactory('signup', inputs, setErrors, () => {
        callSignupApi(loading, setLoading, setErrors, inputs.username, inputs.email, inputs.password, onSuccess);
    });

    return {
        inputs,
        errors,
        loading,
        handleInputChange,
        handleSubmit,
    };
};

const useLoginForm = (onSuccess) => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = handleInputChangeTemplate(setInputs, setErrors, '404');

    const handleSubmit = handleSubmitFactory('login', inputs, setErrors, () => {
        callLoginApi(loading, setLoading, setErrors, inputs.email, inputs.password, onSuccess);
    });

    return {
        inputs,
        errors,
        loading,
        handleInputChange,
        handleSubmit,
    };
};