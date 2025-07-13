import '../../styles/capsuleCards.css'
import {useNavigate} from 'react-router-dom'


export const CapsuleCard = ({capData}) => {
    const navigate = useNavigate()

    return(
        <div className="capsuleCardMain flex-col items-center" onClick={() => navigate('/capsule/' + capData.id)}>
            <div className='flex-row justify-start items-center capsuleUserDiv'>
                <img className='capsuleUserImage' src={capData.userImg} alt='capsule' />
                <p className='capsuleUsername'>{capData.userName}</p>
            </div>
            <p className='capsuleNameText'>{capData.capName}</p>
            <div className='capsuleContentsDiv flex-col justify-between items-center'>
                {capData.videoCount} videos <br/>
                {capData.imgCount} images <br/>
                {capData.textCount} texts <br/>
            </div>
        </div>
    )
}