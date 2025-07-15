import {PersonalCapsuleCard} from './components/capsuleCards.jsx'
import '../styles/common.css'
import '../styles/UserWall.css'
import { CapsuleData, CapsuleMedia, CapsuleSettings, CapsuleListFromJson, dummyData } from '../classes/CapsuleData.jsx';
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
        {creating && <CapsuleCreationPopup setCreating={setCreating} user={user}/>}
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

const CapsuleCreationPopup = ({setCreating, user}) => {
    const [inputs, setInputs] = useState({
        name: '',
        openDate: new Date(),
        privacy: 'private',
        surprise: false,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleInputChange = (field, value) => {
        setInputs(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validate = () => {
        const newErrors = {};

        if (!inputs.name.trim()) newErrors.name = '*Capsule Name is required';
        if (inputs.openDate < new Date()) newErrors.openDate = '*Date must be in future!';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    const callCreateCapsuleRequest = () => {
        if(validate()){
            console.log(inputs)
            const capSettings = new CapsuleSettings(inputs.name, inputs.openDate, inputs.privacy, inputs.surprise)
            const capsuleData = new CapsuleData(undefined, user, undefined, capSettings)
            
            //try create and get back ID
            capsuleData.id = 1000

            const capsules = JSON.parse(localStorage.getItem('publicCapsuleJsonData'))
            capsules.push(capsuleData)
            localStorage.setItem('publicCapsuleJsonData', JSON.stringify(capsules))

            navigate('/capsule/' + capsuleData.id)

        }else{

        }
        //attempt to create
        //retrieve id from response

        //add capsule to localStorage
        //navigate to capsule with ID

        // navigate('/capsule/' + capsule.id)
    }

    return(
        <div className='creationPopupBackDrop' onClick={() => setCreating(false)}>
            <div className='flex-col creationPopupDiv' onClick={(e) => e.stopPropagation()}>
                    <div>Capsule Name:<input className='creationPopupInput' value={inputs.name} placeholder='Eg: My Birthday Capsule' onChange={(e) => handleInputChange('name', e.target.value)}/></div>
                    {errors.name && <p className="inputErrorMsg">{errors.name}</p>}
                    
                    <div>Release Date:<DatePicker selected={inputs.openDate} onChange={(date) => handleInputChange('openDate', date)} className='creationPopupDatePicker'/></div>
                    {errors.openDate && <p className="inputErrorMsg">{errors.openDate}</p>}

                    <div>Privacy:   <label className='creationRadioLabel'  onClick={() => handleInputChange('privacy', 'private')}>
                                        <input type='radio' value='private' checked={inputs.privacy == 'private'}/>
                                    {' '}Private</label>
                                    <label className='creationRadioLabel' onClick={() => handleInputChange('privacy', 'public')}>
                                        <input type='radio' value='public' checked={inputs.privacy == 'public'}/>
                                    {' '}Public</label>
                    </div>
                    
                    <br/>
                    <div><input type='checkbox' value={inputs.surprise} onClick={() => handleInputChange('surprise', !inputs.surprise)}/> {' '}Surprise Me? </div>
                    <br/>
                    
                    <div>
                        <button className='cardBtn createBtn' onClick={callCreateCapsuleRequest}>Create</button> 
                        <button className='cardBtn createBtn' onClick={() => setCreating(false)}>Cancel</button>
                    </div>
            </div>
        </div>
    )
}

export default UserWall;