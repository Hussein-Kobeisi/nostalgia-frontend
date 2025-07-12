import '../../styles/capsuleCards.css'


export const CapsuleCard = () => {

    return(
        <div className="capsuleCardMain flex-col items-center">
            <div className='flex-row justify-start capsuleUserDiv'>
                <img className='capsuleUserImage' src='https://picsum.photos/200/300' alt='capsule' />
                <p className='capsuleUsername'>Username</p>
            </div>
        </div>
    )
}