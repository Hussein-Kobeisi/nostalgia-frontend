
import {PersonalCapsuleCard} from './components/capsuleCards.jsx'
import '../styles/common.css'
import '../styles/UserWall.css'

const UserWall = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    return(
    <div className="mainPage flex-row wrap items-start userWallMain">
        <PersonalCapsuleCard capData={{id: 1,capName:'myName', videoCount:10, imgCount:7, textCount:1}}/>
        <PersonalCapsuleCard capData={{id: 1,capName:'myName', videoCount:10, imgCount:7, textCount:1}}/>
        <PersonalCapsuleCard capData={{id: 1,capName:'myName', videoCount:10, imgCount:7, textCount:1}}/>
        <PersonalCapsuleCard capData={{id: 1,capName:'myName', videoCount:10, imgCount:7, textCount:1}}/>
        <PersonalCapsuleCard capData={{id: 1,capName:'myName', videoCount:10, imgCount:7, textCount:1}}/>
        <PersonalCapsuleCard capData={{id: 1,capName:'myName', videoCount:10, imgCount:7, textCount:1}}/>
        <PersonalCapsuleCard capData={{id: 1,capName:'myName', videoCount:10, imgCount:7, textCount:1}}/>
    </div>
    
)}

export default UserWall;