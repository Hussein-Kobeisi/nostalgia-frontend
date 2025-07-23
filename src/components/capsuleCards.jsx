import '../styles/capsuleCards.css'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react';
import * as API from '../apis/apis'


export const CapsuleCard = ({capData}) => {
    const navigate = useNavigate()
    const user = useUserFromCapsule(capData);

    return(
        <div className="capsuleCardMain flex-col items-center" onClick={() => navigate('/capsule/' + capData.id)}>
            <div className='flex-row justify-start items-center capsuleUserDiv'>
                <img className='capsuleUserImage' src={API.mainRoute+user.img} alt='capsule' />
                <p className='capsuleUsername'>{user.name}</p>
            </div>
            <p className='capsuleNameText'>{capData.name}</p>
            <p className='capsuleDateText'>{'Opened at:' + capData.open_date}</p>
        </div>
    )
}

export const PersonalCapsuleCard = ({capData}) => {
    const navigate = useNavigate()

    return(
        <div className="capsuleCardMain capsulePersonalCardMain flex-col items-center" onClick={() => navigate('/capsule/' + capData.id)}>
            <div className='flex-row justify-start items-center capsuleUserDiv'>
            </div>
            <p className='capsuleNameText'>{capData.name}</p>
            <p className='capsuleDateText'>{'Opened at:' + capData.open_date}</p>
        </div>
    )
}

export const HomeCapsuleCard = ({capData}) => {
    const navigate = useNavigate()
    const user = useUserFromCapsule(capData);

    return(
        <div className="capsuleCardMain capsuleCardMainHome flex-col items-center" onClick={() => navigate('/capsule/' + capData.id)}>
            <div className='flex-row justify-start items-center capsuleUserDiv'>
                <img className='capsuleUserImage capsuleUserImageHome' src={API.mainRoute+user.img} alt='capsule' />
                <p className='capsuleUsername'>{user.name}</p>
            </div>
            <p className='capsuleNameText'>{capData.name}</p>
            <p className='capsuleDateText'>{'Opened at:' + capData.open_date}</p>
        </div>
    )
}

//custom Hooks
const useUserFromCapsule = (capData) => {
    const [user, setUser] = useState({
        img: '',
        name: '',
    });

    useEffect(() => {
        if (capData.user) {
            setUser((prev) => ({
                ...prev,
                name: capData.user.name ?? '',
                img: capData.user.img ?? prev.img,
            }));
        }
    }, [capData.user]);

    return user;
};