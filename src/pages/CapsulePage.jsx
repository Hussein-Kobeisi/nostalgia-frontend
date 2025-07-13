import {useParams} from "react-router-dom";
import '../styles/CapsulePage.css';

const CapsulePage = () => {
    const id = useParams().id;
    const capsule = JSON.parse(localStorage.getItem("publicCapsuleJsonData"))
                    .find(capsule => capsule.id == id);
    let user = JSON.parse(localStorage.getItem("user"))
    user = 1

    capsule.texts.push("lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

    return(
        <div className="mainPage flex-row wrap capsulePageMain">
            {
                capsule.imgs.map((imgUrl) => (<img className="capsuleImage" src={imgUrl}/>))
            }
            {
                capsule.videos.map((videoUrl) => (<video className="capsuleVideo" controls>
                                                    <source src={videoUrl} type="video/mp4"/>
                                                </video>))
            }
            {
                capsule.texts.map((text) => (<div className="capsuleTextContainer"><div className="capsuleText">{text}</div></div>))
            }

            {(user != undefined) && (user == capsule.userId) && 
            <button className="uploadMediaButton"> + </button>}
        </div>
)}

export default CapsulePage;