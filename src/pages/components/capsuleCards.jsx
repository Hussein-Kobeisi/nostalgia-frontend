import '../../styles/capsuleCards.css'
import {useNavigate} from 'react-router-dom'
import * as API from '../../apis/apis'


export const CapsuleCard = ({capData}) => {
    const navigate = useNavigate()
    capData['userImg'] = ''
    capData['user_name'] = ''

    if(capData.user){
        
        capData['userImg'] = capData.user.img ?? ''
        capData['user_name'] = capData.user.name ?? ''
        console.log(API.mainRoute+capData['userImg'])
    }

    return(
        <div className="capsuleCardMain flex-col items-center" onClick={() => navigate('/capsule/' + capData.id)}>
            <div className='flex-row justify-start items-center capsuleUserDiv'>
                <img className='capsuleUserImage' src={API.mainRoute+capData['userImg']} alt='capsule' />
                <p className='capsuleUsername'>{capData.user_name}</p>
            </div>
            <p className='capsuleNameText'>{capData.name}</p>
            {/* <div className='capsuleContentsDiv flex-col justify-between items-center'>
                {capData.videoCount} videos <br/>
                {capData.imgCount} images <br/>
                {capData.textCount} texts <br/>
            </div> */}
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
            <div className='capsuleContentsDiv flex-col justify-between items-center'>
                {capData.videoCount} videos <br/>
                {capData.imgCount} images <br/>
                {capData.textCount} texts <br/>
            </div>
        </div>
    )
}