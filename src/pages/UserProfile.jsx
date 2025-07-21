import '../styles/UserProfile.css'
import {Popup} from './components/popup'
import { useState } from 'react'
import * as API from '../apis/apis'
import axios from 'axios';

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const inputFields = ['name', 'email', 'mobile', 'password', 'confirm']
    const [userState, setUserState] = useState({
        name: user.name ?? '',
        email: user.email ?? '',
        mobile: user.mobile ?? '',
        password: user.password ?? '',
        confirm:user.password ?? ''
    })
    const [errors, setErrors] = useState({})

    const [visibleSuccessPopup, setVisibleSuccessPopup] = useState(false)
    const [visibleFailedPopup, setVisibleFailedPopup] = useState(false)

    const handleInputChange = (field, value) => {
        setUserState(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        if (userState.name != '' && !userState.name.trim()) newErrors.name = '*User Name is required';
        if (userState.email != '' && !userState.email.includes('@')) newErrors.email = '*Email should be a valid domain';
        if (userState.mobile != '' && !userState.mobile.match(/^\d{10}$/)) newErrors.mobile = '*Mobile should be a 10-digit numebr';
        if (userState.password != '' && userState.password.length < 6) newErrors.password = '*Password should be at least 6 characters';
        if (userState.confirm != '' && userState.confirm != userState.password) newErrors.confirm = "*Passwords don't match";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = () => {
        if(validate()){
            axios.post(API.updateUserApi, {
                id: user.id,
                name: userState.name,
                mobile: userState.mobile,
                email: userState.email,
                password: userState.password
            },
            {
                headers: {
                'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token')),
                'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log(response)
                setVisibleSuccessPopup(true)
            })
            .catch(() => 
                setVisibleFailedPopup(true)
            )          
        }
    }


    return(
    <div className='mainPage novaFont userProfileMain'>
        <div className='creationPopupDiv flex-col'>

            <UserInputFields inputFields={inputFields} userState={userState} errors={errors} handleInputChange={handleInputChange}/>
            <button className='cardBtn createBtn' onClick={handleSubmit}>Save Changes</button>
            <Popup visible={visibleSuccessPopup} setVisible={setVisibleSuccessPopup}/>
            <Popup visible={visibleFailedPopup} setVisible={setVisibleFailedPopup} msg='Try Again!' addClass='fail'/>
        </div>
        
    </div>
)}

const UserInputFields = ({inputFields, userState, errors, handleInputChange}) => {
    return inputFields.map(
        (field, i) => (
            <div key={i} className='flex-row userFormRow'>
                <p>{field}</p>
                <div>
                    <input value={userState[field] ?? ''} type={(field=='confirm' || field=='password') ? 'password' : ''} className='cardInput userProfileInput' onChange={(e) => handleInputChange(field, e.target.value)}/>
                    {errors[field] && <p className="inputErrorMsg">{errors[field]}</p>}
                </div>
            </div>
        )
    )
}

export default UserProfile;