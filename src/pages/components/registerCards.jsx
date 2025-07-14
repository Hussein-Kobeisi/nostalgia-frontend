import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export const LoginCard = ({setLogin, register}) => {
    const navigate = useNavigate();

    const inputFields = ['username', 'password']

    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        if (!inputs.username.trim()) newErrors.username = 'Username is required';
        if (inputs.password.length < 6) newErrors.password = 'Password too short';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            //read user details from response
            const signUser = new User(undefined, inputs['username'], undefined, undefined, inputs['password'], undefined)
            localStorage.setItem('user', JSON.stringify(signUser))
            navigate('/publicwall');
        } else {
            console.log('Form has errors:', errors);
        }
    };
    
    return(
    <div className='registerCard justify-between flex-col items-center'>
        <p className='cardText bold'>Login</p>

        <div className='flex-col items-center'>    
           {renderInputFields({inputFields, inputs, errors, handleInputChange, isSignup:false})}
        </div>

        <div className='flex-col items-center'>
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
    
    const inputFields = ['username', 'email', 'mobile', 'password', 'confirmPassword']

    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        if (!inputs.username.trim()) newErrors.username = 'Username is required';
        if (!inputs.email.includes('@')) newErrors.email = 'Invalid email';
        if (!inputs.mobile.match(/^\d{10}$/)) newErrors.mobile = 'Mobile must be 10 digits';
        if (inputs.password.length < 6) newErrors.password = 'Password too short';
        if (inputs.confirmPassword !== inputs.password)
        newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            //read user ID from response
            const signUser = new User(undefined, inputs['username'], inputs['email'], inputs['mobile'], inputs['password'], undefined)
            localStorage.setItem('user', JSON.stringify(signUser))
            navigate('/publicwall');
        } else {
            console.log('Form has errors:', errors);
        }
    };

    return(
    <div className='registerCard justify-between flex-col items-center'>
        <p className='cardText bold'>Sign Up</p>

        <div className='flex-col items-center'>    
           {renderInputFields({inputFields, inputs, errors, handleInputChange, isSignup:true })}
        </div>

        <div className='flex-col items-center'>
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

class User{
    constructor(id=0, name='noName', email='noMail', mobile='0000', password='123', img=''){
        this.id = id
        this.username = name
        this.email = email
        this.mobile = mobile
        this.password = password
        this.img = img
    }
}