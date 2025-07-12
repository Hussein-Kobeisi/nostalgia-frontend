import {useNavigate} from 'react-router-dom';
import '../styles/common.css'
import '../styles/PublicWall.css'

const PublicWall = () => (
    <div className="mainPage flex-col publicMain">
        <div className='publicTextDiv flex-col items-center'>
            <div className='bigPublicText'>Moments Shared by Others</div>
            <div className='smallPublicText'>Dig deep and explore!</div>
        </div>

        <div className='publicYearDiv flex-col items-center'>
            2020s
        </div>
        <>srg</>
        <div className='publicYearDiv flex-col items-center'>
            2015s
        </div>

        <div className='publicYearDiv flex-col items-center'>
            2010s
        </div>
    </div>
)

export default PublicWall;