import '../styles/common.css'
import '../styles/pageHeader.css'
import { useNavigate } from 'react-router-dom'

const PageHeader = () => {
    const navigate = useNavigate()

    return(
    <div className='pageHeaderMain flex-row justify-between items-center'>
        <button onClick={() => navigate('/home')}>Nostalgia</button>
        
        <div className='pageHeaderUserDiv flex-row items-center'>
            <button className='flex-row items-center' onClick={() => navigate('/userpage')}>
                <p>Username</p>
                <img className='userImg'/>
            </button>
        </div>
        
        <div className='pageRegisterButtonsDiv' style={{display: 'none'}}>

        </div>
    </div>)
}

export default PageHeader;