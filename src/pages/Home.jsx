import {useNavigate} from 'react-router-dom';
import '../styles/common.css'
import '../styles/Home.css'

const Home = () => {
    const navigate = useNavigate()

    return(
    <div className="mainPage flex-row homePage">
        <div className='flex-col items-center homeDiv1'>
            <p className='homeText'>{homeText}</p>
            <div className='homeText'> 3 capsules here</div>
        </div>
        <div className='flex-col items-center homeDiv2'>
            <p className='homeTitle'>Nostalgia</p>
            <button className='homeBtn' onClick={() => navigate('/register')}>Go To Login</button>
        </div>
    </div>
)}


const homeText = 'The time capsule platform where memories are sealed and emotions preserved. Save photos, videos, and thoughts today, and relive them when the time is right. Create your own capsule, or explore moments others have chosen to share with the world. Ready to time travel?'

export default Home;