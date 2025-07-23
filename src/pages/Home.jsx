import {useNavigate} from 'react-router-dom';
import '../styles/common.css'
import '../styles/Home.css'
import {HomeCapsuleCard} from '../components/capsuleCards.jsx'

const Home = () => {
    const navigate = useNavigate()
    const capsules = JSON.parse(localStorage.getItem('publicCapsules'))

    return(
    <div className="mainPage flex-row homePage">
        <div className='flex-col items-center homeDiv1'>
            <p className='homeText'>{homeText}</p>
            <div className='flex-row homeCapsules'>
                <HomeCapsuleCard className="homeCap" capData={capsules[0]}/>
                <HomeCapsuleCard className="homeCap" capData={capsules[1]}/>
                <HomeCapsuleCard className="homeCap" capData={capsules[2]}/>
            </div>
        </div>
        <div className='flex-col items-center homeDiv2'>
            <p className='homeTitle'>Nostalgia</p>
            <div className='homeBtnsDiv flex-col items-center'>
                <button className='homeBtn' onClick={() => navigate('/register?login=true')}>Go To Login</button>
                <button className='homeBtn' onClick={() => navigate('/publicwall')}>View Public Posts</button>
            </div>
        </div>
    </div>
)}


const homeText = 'The time capsule platform where memories are sealed and emotions preserved. Save photos, videos, and thoughts today, and relive them when the time is right. Create your own capsule, or explore moments others have chosen to share with the world. Ready to time travel?'

export default Home;