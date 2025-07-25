import '../styles/common.css'
import '../styles/pageHeader.css'
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const PageHeader = () => {
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    return(
    <div className='pageHeaderMain flex-row justify-between items-center'>
        <div className='headerLeft'>
            <button onClick={() => navigate('/home')}>Nostalgia</button>
            {' | '}
            <button onClick={() => navigate('/publicwall')}>Public</button>
        </div>
        {(!user) ? <GuestButtons /> : <UserButtons user={user} />}
        
        <div className='pageRegisterButtonsDiv' style={{display: 'none'}}>

        </div>
    </div>)
}

const UserButtons = ({ user }) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    return(
    <div className='userButtonsDiv flex-row items-center'>
        <button className='flex-row items-center' onClick={() => setIsOpen(!isOpen)}>
            <p>{user.name}</p>
            <img className='userImg' src={(user.img != '') ? user.img : null}/>           
        </button>
        {isOpen &&
            <ul className="userDropdownMenu">
                <li className="userDropdownItem" onClick={() => {navigate('/profile'); setIsOpen(false)}}>Profile</li>
                <li className="userDropdownItem" onClick={() => {navigate('/userwall'); setIsOpen(false)}}>Personal Wall</li>
            </ul>
        }

    </div>
)}

const GuestButtons = () => {
    const navigate = useNavigate()

    return(
        <div>
            <button className='guestHeaderButton' onClick={() => navigate('/register')}>Login</button>
            <button className='guestHeaderButton' onClick={() => navigate('/register')}>Sign Up</button>
        </div>
    )
}

export default PageHeader;