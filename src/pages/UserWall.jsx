import {PersonalCapsuleCard} from '../components/capsuleCards.jsx'
import '../styles/common.css'
import '../styles/UserWall.css'
import { CapsuleData, CapsuleSettings, CapsuleListFromJson, dummyData } from '../classes/CapsuleData.jsx';
import '../classes/CapsuleData.jsx'
import { useEffect, useState, useRef} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import * as API from '../apis/apis'
import axios from 'axios';


const UserWall = () => {
    const didMount = useRef(false);
    const user = JSON.parse(localStorage.getItem("user"))
    const [creating, setCreating] = useState(false)
    const [caps, setCaps] = useState()
    const [ready, setReady] = useState(false)
    const [loading, setLoading] = useState(false)
    const jsonData = dummyData;

    useEffect(() => {callGetUserCapsules(setCaps, setLoading)}, []);
    useEffect(() => trySetReady(didMount, setReady), [caps])

    return(
    <div className="mainPage userWallMain">
        {ready && <PersonalCapsuleList capsuleJsonData={caps}/>}
        <button className="newCapsuleButton" onClick={() => setCreating(true)}> Create New </button>
        {creating && <CapsuleCreationPopup setCreating={setCreating} setLoading={setLoading} user={user}/>}
        {loading && <div className='loaderDiv'><ClipLoader loading={loading} size={35} /></div>}
    </div>
)}

//components
const PersonalCapsuleList = ({capsuleJsonData}) =>  {

    capsuleJsonData = capsuleJsonData.sort((a, b) => {
        return new Date(b.open_date) - new Date(a.open_date);
    });

    return(
    <>
            {
                capsuleJsonData.map( item => (<PersonalCapsuleCard key={item.id} capData={item}/>))
            }
    </>
)}

const CapsuleCreationPopup = ({setCreating, user, setLoading}) => {
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
            const capSettings = new CapsuleSettings(inputs.name, new Date(), inputs.openDate, inputs.privacy, inputs.surprise)
            const capsuleData = new CapsuleData(undefined, user, capSettings)
            const token = JSON.parse(localStorage.getItem('token'))
            setLoading(true)
            axios.post(API.addOrUpdateCapsuleApi, {
                user_id: user.id,
                name: capsuleData.name,
                create_date: (new Date()).toISOString().slice(0, 19).replace('T', ' '),
                open_date: capsuleData.openDate.toISOString().slice(0, 19).replace('T', ' '),
                privacy: capsuleData.privacy,
                surprise: capsuleData.surprise,
            },
            {
                headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
                }
            })
            .then(response => {
                let capsules = JSON.parse(localStorage.getItem('userCapsules'))
                capsules.push(response.data.payload)
                localStorage.setItem('userCapsules', JSON.stringify(capsules))
                setLoading(false)
                navigate('/capsule/' + response.data.payload.id)
            })
            .catch((e) =>{
                console.log(e)
                setLoading(true)
            })

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
                    {errors.name && <p className="inputUserErrorMsg">{errors.name}</p>}
                    
                    <div>Release Date:<DatePicker selected={inputs.openDate} onChange={(date) => handleInputChange('openDate', date)} className='creationPopupDatePicker'/></div>
                    {errors.openDate && <p className="inputUserErrorMsg">{errors.openDate}</p>}

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

//functions
function callGetUserCapsules(setCaps, setLoading){
    setLoading(true)
    axios.get(API.getUserCapsulesApi, {
        headers: {
            Authorization: `Bearer ` + JSON.parse(localStorage.getItem('token'))
    }})
    .then(response => {
        setLoading(false)
        setCaps(response.data.payload)
        localStorage.setItem('userCapsules', JSON.stringify(response.data.payload))
    })
    .catch(() => {
        setLoading(false)
    })
}

function trySetReady(didMount, setReady){
    if (didMount.current){
        setReady(true);
    }else
        didMount.current = true;
}
export default UserWall;