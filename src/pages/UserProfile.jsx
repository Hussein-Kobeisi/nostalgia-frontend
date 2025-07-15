import '../styles/UserProfile.css'
import { useState } from 'react'

const UserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const inputFields = ['name', 'email', 'mobile', 'password', 'confirm']
    const [userState, setUserState] = useState({...user, confirm:user.password})
    const [errors, setErrors] = useState({})

    const handleInputChange = (field, value) => {
        setUserState(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        if (!userState.name.trim()) newErrors.name = '*User Name is required';
        if (!userState.email.includes('@')) newErrors.email = '*Email should be a valid domain';
        if (!userState.mobile.match(/^\d{10}$/)) newErrors.mobile = '*Mobile should be a 10-digit numebr';
        if (!userState.password.length < 6) newErrors.password = '*Password should be at least 6 characters';
        if (userState.confirm != userState.password) newErrors.confirm = "*Passwords don't match";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = () => {
        if(validate()){
            user.name = userState.name
            user.email = userState.email
            user.mobile = userState.mobile
            user.password = userState.password

            localStorage.setItem('user', JSON.stringify(user))
        }
    }


    return(
    <div className='mainPage novaFont userProfileMain'>
        <div className='creationPopupDiv flex-col'>

            <UserInputFields inputFields={inputFields} userState={userState} errors={errors} handleInputChange={handleInputChange}/>
            <button className='cardBtn createBtn' onClick={handleSubmit}>Save Changes</button>
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
                    {errors[field]&& <p className="inputErrorMsg">{errors[field]}</p>}
                </div>
            </div>
        )
    )
}

export default UserProfile;