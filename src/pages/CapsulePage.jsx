import {useParams} from "react-router-dom";
import '../styles/CapsulePage.css';

const CapsulePage = () => {
    const id = useParams().id;
    
    const capsule = JSON.parse(localStorage.getItem("publicCapsuleJsonData"))
                    .find(capsule => capsule.id == id);
    let user = JSON.parse(localStorage.getItem("user"))
    user = 1

    return(
        <div>
            {capsule ? <CapsuleContentsDisplay capsule={capsule} user={user}/> :
                       <CapsuleNotFound />}
        </div>
)}

const CapsuleContentsDisplay = ({capsule, user}) => (
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
)

const CapsuleNotFound = () => (
    <div className="mainPage fullscreen capsuleNotFound">
        Error 404: Capsule Not Found
    </div>
)

export default CapsulePage;