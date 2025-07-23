import '../styles/UserProfile.css'
import {Popup} from '../components/popup'
import {useState, useCallback } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {handleProfileSubmit } from '../utils/userProfileUtils';

const UserProfile = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    const inputFields = ['name', 'email', 'mobile', 'password', 'confirm']

    const {
        userState, setUserState, errors, setErrors, loading,
        visibleSuccessPopup, visibleFailedPopup, handleSubmit,
        setVisibleSuccessPopup, setVisibleFailedPopup
    } = useUserUpdate(user);

    const handleInputChange = (field, value) => {
        setUserState(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };


    return(
    <div className='mainPage novaFont userProfileMain'>
        <div className='creationPopupDiv flex-col'>

            <UserInputFields inputFields={inputFields} userState={userState} errors={errors} handleInputChange={handleInputChange}/>
            <button className='cardBtn createBtn' onClick={() => {handleSubmit()}}>Save Changes</button>
            <Popup visible={visibleSuccessPopup} setVisible={setVisibleSuccessPopup}/>
            <Popup visible={visibleFailedPopup} setVisible={setVisibleFailedPopup} msg='Try Again!' addClass='fail'/>
            {loading && <div className='loaderDiv'><ClipLoader loading={loading} size={35} /></div>}
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

//custom Hooks
const useUserUpdate = (user) => {
    const [userState, setUserState] = useState({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        password: '',
        confirm: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [visibleSuccessPopup, setVisibleSuccessPopup] = useState(false);
    const [visibleFailedPopup, setVisibleFailedPopup] = useState(false);

    const handleSubmit = useCallback(() => {
        handleProfileSubmit(user, userState, setErrors, setLoading, setVisibleSuccessPopup, setVisibleFailedPopup);
    }, [user, userState]);

    return {
        userState, 
        setUserState, 
        errors, 
        setErrors,
        loading,
        visibleSuccessPopup,
        visibleFailedPopup,
        handleSubmit,
        setVisibleSuccessPopup,
        setVisibleFailedPopup,
    };
}

export default UserProfile;