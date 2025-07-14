import {PersonalCapsuleCard} from './components/capsuleCards.jsx'
import '../styles/common.css'
import '../styles/UserWall.css'
import { CapsuleData, CapsuleListFromJson, dummyData } from '../classes/CapsuleData.jsx';
import '../classes/CapsuleData.jsx'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';


const UserWall = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [creating, setCreating] = useState(false)
    
    const jsonData = dummyData;

    return(
    <div className="mainPage userWallMain">
        <PersonalCapsuleList capsuleJsonData={jsonData}/>
        <button className="newCapsuleButton" onClick={() => setCreating(true)}> Create New </button>
        {creating && <CapsuleCreationPopup setCreating={setCreating}/>}
    </div>
)}

const PersonalCapsuleList = ({capsuleJsonData}) =>  {

    const capslist = CapsuleListFromJson(capsuleJsonData).map(item => item.getDisplayData())
    // capslist.map( item => console.log(item.getDisplayData()))

    return(
    <div className="flex-row wrap items-start personalCapsuleDiv">
            {
                capslist.map( item => (<PersonalCapsuleCard key={item.id} capData={item}/>))
            }
    </div>
)}

const CapsuleCreationPopup = ({setCreating}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [privacyState, setPrivacyState] = useState('private')
    const navigate = useNavigate()

    const callCreateCapsule = () => {
        //attempt to create
        //retrieve id from response

        //add capsule to localStorage
        //navigate to capsule with ID

        // navigate('/capsule/' + capsule.id)
    }

    return(
        <div className='creationPopupBackDrop' onClick={() => setCreating(false)}>
            <div className='flex-col creationPopupDiv' onClick={(e) => e.stopPropagation()}>
                    <div>Capsule Name:<input className='creationPopupInput' placeholder='Eg: My Birthday Capsule'/></div>
                    <div>Release Date:<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className='creationPopupDatePicker' /></div>
                    <div>Privacy:   <label className='creationRadioLabel'  onClick={() => setPrivacyState('private')}>
                                        <input type='radio' value='private' checked={privacyState == 'private'}/>
                                    {' '}Private</label>
                                    <label className='creationRadioLabel' onClick={() => setPrivacyState('public')}>
                                        <input type='radio' value='public' checked={privacyState == 'public'}/>
                                    {' '}Public</label>
                    </div>
                    <br/>
                    <div><input type='checkbox'/> {' '}Surprise Me? </div>
                    <br/>
                    <div>
                        <button className='cardBtn createBtn' onClick={callCreateCapsule}>Create</button> 
                        <button className='cardBtn createBtn' onClick={() => setCreating(false)}>Cancel</button>
                    </div>
            </div>
        </div>
    )
}

export default UserWall;