import {useParams} from "react-router-dom";
import {useState, useEffect, useRef} from "react";
import axios from 'axios';
import * as API from '../apis/apis'
import '../styles/CapsulePage.css';
import '../styles/common.css';
import ClipLoader from "react-spinners/ClipLoader";

const CapsulePage = () => {
    const didMount = useRef(false);
    const [title, setTitle] = useState([])
    const [media, setMedia] = useState([])
    const [userId, setUserId] = useState(-1)

    let user = JSON.parse(localStorage.getItem("user"))
    const id = useParams().id;
    
    
    useEffect(() => {
        callGetMedia(id, setMedia)
        setUserId(findUserID(id))
    }, []);
    
    return(
        <div className="mainPage capsulePageMainMain">
            <p className="novaFont capsulePageTitle">Capsule View</p>
            <p className="novaFont capsulePageTitle">____________</p>
            <div className="fullscreen flex-row wrap capsulePageMain">
                {media.map((file, i) => (
                    <CapsuleContentsDisplay key={i} url={API.mainRoute+file.file_path} />
                ))}
                
                {(user != undefined) && (user.id == userId) && 
                    <button className="uploadMediaButton"> + </button>}
            </div>
        </div>
)}

//components
const CapsuleContentsDisplay = ({ url }) => {
  const [text, setText] = useState('');
  const extension = url.split('.').pop().toLowerCase();

  useEffect(() => {
        if (['txt', 'md', 'json'].includes(extension)) {
          console.log(url)
            axios.get(url)
            .then(response => setText(response.data))
            .catch(() => setText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'));
        }
    }, []);

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
    return <img className="capsuleImage" src={url} alt="Capsule media" />;
  }

  if (['mp4', 'webm', 'ogg', 'vlc'].includes(extension)) {
    return (
      <video className="capsuleVideo" controls>
        <source src={url} type={`video/${extension}`} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (['txt', 'md', 'json'].includes(extension)) {
    return <p className="capsuleText">{text}</p>;
  }

  return <div className="unsupportedFile">Unsupported file type: {extension}</div>;
};

const CapsuleNotFound = () => (
    <div className="fullscreen capsuleNotFound">
        Error 404: Capsule Not Found
    </div>
)

//functions
function callGetMedia(id, setMedia){
    axios.get(API.getMediaByCapsuleIdApi+id)
    .then(response => {
        setMedia(response.data.payload)
    })
}

function findUserID(capid){
    const publicCapsules = JSON.parse(localStorage.getItem('publicCapsules') || '[]');
    const capsule = publicCapsules.find(item => item.id == capid);
    return capsule.user_id
}

export default CapsulePage;