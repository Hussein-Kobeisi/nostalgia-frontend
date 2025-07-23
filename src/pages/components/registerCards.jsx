import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as API from '../../apis/apis'
import ClipLoader from "react-spinners/ClipLoader";

export const LoginCard = ({setLogin, register}) => {
    const navigate = useNavigate();
    const inputFields = ['email', 'password']

//states
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

//form functions
    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' , '404':''}));
    };

    const validate = () => {
        const newErrors = {};

        if (!inputs.email.trim()) newErrors.email = 'Email is required';
        if (inputs.password.length < 6) newErrors.password = 'Password too short';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            callLoginApi(inputs['email'], inputs['password'])
        } else {
            console.log('Form has errors:', errors);
        }
    };
    
//api functions
    const callLoginApi = (email, password) => {
        if(loading)
            return
        setLoading(true)
        axios.post(API.loginApi, {
            email: email,
            password: password
        })
        .then(response => {
            console.log(response)
            saveUserAndToken(response.data.user, response.data.authorisation.token)
            setLoading(false)
            navigate('/publicwall');
        })
        .catch(error => {
            setErrors({'404':'Incorrect Email or Password'})
            setLoading(false)
        });
    }

    const saveUserAndToken = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
    }

//component body
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

//states
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

//form functions
    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '', '400':'' }));
    };

    const validate = () => {
        const newErrors = {};

        if (!inputs.username.trim()) newErrors.username = 'Username is required';
        if (!inputs.email.includes('@')) newErrors.email = 'Invalid email';
        if (inputs.password.length < 6) newErrors.password = 'Password too short';
        if (inputs.confirmPassword !== inputs.password)
        newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            callSignupApi(inputs['username'], inputs['email'], inputs['password']) 
        } else {
            console.log('Form has errors:', errors);
        }
    };

//api functions
    const callSignupApi = (username, email, password) => {
        if(loading)
            return
        setLoading(true)
        axios.post(API.signupApi, {
            name: username,
            email: email,
            password: password
        })
        .then(response => {
            saveUserAndToken(response.data.user, response.data.authorisation.token)
            navigate('/publicwall');
            setLoading(false)
        })
        .catch(error => {
            setErrors({'400': error.response.data.message})
            setLoading(false)
        });
    }

    const saveUserAndToken = (user, token) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', JSON.stringify(token))
    }

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

function renderInputFields({ inputFields, inputs, errors, handleInputChange, isSignup }) {
  return inputFields.map((field, i) => (
    <div key={i} className="flex-col items-center">
      <input
        className={(isSignup ? 'signCardInput' : 'cardInput') + (errors[field] ? ' errorInput' : '')}
        placeholder={field[0].toUpperCase() + field.slice(1).replace('Password', ' Password')}
        type={field.toLowerCase().includes('password') ? 'password' : 'text'}
        value={inputs[field]}
        onChange={e => handleInputChange(field, e.target.value)}
      />
      {errors[field] && <p className="inputErrorMsg">{errors[field]}</p>}
    </div>
  ));
}