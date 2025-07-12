import '../styles/common.css'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()

    return(
    <div className="main flex-row items-center fullscreen">
        <div className='flex-col items-center div1'>
            <p className='homeText'>{homeText}</p>
            <div className='homeText'> 3 capsules here</div>
        </div>
        <div className='flex-col items-center div2'>
            <p className='title'>Nostalgia</p>
            <button className='Btn' onClick={() => navigate('/register')}>Go To Login</button>
        </div>
    </div>
)}


const homeText = 'The time capsule platform where memories are sealed and emotions preserved. Save photos, videos, and thoughts today, and relive them when the time is right. Create your own capsule, or explore moments others have chosen to share with the world. Ready to time travel?'

export default Home;