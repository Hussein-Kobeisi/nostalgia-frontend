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
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    let user = JSON.parse(localStorage.getItem("user"))
    const id = useParams().id;
    
    
    useEffect(() => {callGetMedia(id, setMedia, setLoading);setUserId(findUserID(id))}, []);

    const handleMediaUploaded = async (event) => {
        const file = event.target.files[0];
        const file64 = await fileToBase64(file)
        callUploadMedia(file64, id, setMedia, setLoading)
        event.target.value = null;
    }

    

    
    return(
        <div className="mainPage capsulePageMainMain">
            <p className="novaFont capsulePageTitle">Capsule View</p>
            <p className="novaFont capsulePageTitle">____________</p>
            <div className="fullscreen flex-row wrap capsulePageMain">
                {!media.length && <p className="novaFont">No Media Yet</p>}
                {media.map((file, i) => (
                    <CapsuleContentsDisplay key={i} url={API.mainRoute+file.file_path} />
                ))}
                
                {(user != undefined) && (user.id == userId) && 
                <div className="uploadMediaButton">
                    <label for="fileUpload" class="custom-file-upload">
                    📁 Upload file
                    </label>
                    <input id="fileUpload" type="file" accept="image/*,video/*,.txt" onChange={handleMediaUploaded}/>
                </div>}
            </div>
            {uploading && <UploadMediaPopup setUploading={setUploading}/>}
            {loading && <div className='loaderDiv'><ClipLoader loading={loading} size={35} /></div>}
        </div>
)}

//components
const CapsuleContentsDisplay = ({ url }) => {
const [text, setText] = useState('');
const extension = url.split('.').pop().toLowerCase();

useEffect(() => {
        if (['txt', 'md', 'json'].includes(extension)) {
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

const UploadMediaPopup = (setUploading) => {
    return(
        <div className='creationPopupBackDrop' onClick={() => setUploading(false)}>
            <div className='flex-col creationPopupDiv' onClick={(e) => e.stopPropagation()}>
                <label for="fileUpload" class="custom-file-upload">
                📁 Upload file
                </label>
                <input id="fileUpload" type="file" accept="image/*,video/*,.txt" multiple />
            </div>
        </div>
    )
}

//functions
function callGetMedia(id, setMedia, setLoading){
    setLoading(true)
    axios.get(API.getMediaByCapsuleIdApi+id)
    .then(response => {
        setLoading(false)
        setMedia(response.data.payload)
    })
}

function findUserID(capid){
    const publicCapsules = JSON.parse(localStorage.getItem('publicCapsules') || '[]');
    const userCapsules = JSON.parse(localStorage.getItem('userCapsules') || '[]');
    let capsule = publicCapsules.find(item => item.id == capid);
    if(capsule == null)
        capsule = userCapsules.find(item => item.id == capid);
    if(capsule == null)
        return -1
    return capsule.user_id
}

function callUploadMedia(file64, capid, setMedia, setLoading){
    // console.log(file64)
    setLoading(true)
    axios.post(API.addOrUpdateMediaApi, {
        capsule_id: capid,
        file64: file64
    },
    {
        headers: {
        'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),
        'Content-Type': 'application/json'
        }
    })
    .then( response => {
        setLoading(false)
        // console.log(response)
        setMedia(prev => [...prev, response.data.payload]);
    })
    .catch(e => {
        setLoading(false)
        console.log('eeeeeeeee')
        console.log(e)
    })
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file);
    });
};


export default CapsulePage;