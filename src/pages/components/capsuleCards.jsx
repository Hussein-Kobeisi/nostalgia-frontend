import '../../styles/capsuleCards.css'
import {useNavigate} from 'react-router-dom'


export const CapsuleCard = () => {
    const navigate = useNavigate()

    return(
        <div className="capsuleCardMain flex-col items-center" onClick={() => navigate('/capsule')}>
            <div className='flex-row justify-start items-center capsuleUserDiv'>
                <img className='capsuleUserImage' src='https://picsum.photos/200/300' alt='capsule' />
                <p className='capsuleUsername'>Username</p>
            </div>
            <p className='capsuleNameText'>Capsule Name</p>
            <div className='capsuleContentsDiv flex-col justify-between items-center'>
                1 video <br/>
                3 images <br/>
                10 texts <br/>
            </div>
        </div>
    )
}