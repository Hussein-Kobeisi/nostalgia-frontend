import '../styles/common.css'
import '../styles/pageHeader.css'
import { unstable_HistoryRouter, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const PageHeader = () => {
    const navigate = useNavigate()

    let user = JSON.parse(localStorage.getItem("user"))
    
    //dummy data
    // user = {username: "Mr. Mike", img: "https://www.gravatar.com/avatar/"}

    return(
    <div className='pageHeaderMain flex-row justify-between items-center'>
        <button onClick={() => navigate('/home')}>Nostalgia</button>
        
        {(!user) ? <GuestButtons /> : <UserButtons user={user} />}
        
        <div className='pageRegisterButtonsDiv' style={{display: 'none'}}>

        </div>
    </div>)
}

const UserButtons = ({ user }) => {
    const navigate = useNavigate()

    const [selected, setSelected] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const options = ['Option 1', 'Option 2'];

    const handleSelect = (value) => {
        setSelected(value);
        setIsOpen(false);
    };

    return(
    <div className='userButtonsDiv flex-row items-center'>
        <button className='flex-row items-center' onClick={() => setIsOpen(!isOpen)}>
            <p>{user.username}</p>
            <img className='userImg' src={user.img}/>           
        </button>
        {isOpen &&
            <ul className="userDropdownMenu">
                <li className="userDropdownItem" onClick={() => navigate('/profile')}>Profile</li>
                <li className="userDropdownItem" onClick={() => navigate('/userwall')}>Personal Wall</li>
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