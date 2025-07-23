import {useNavigate} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import '../styles/common.css'
import '../styles/PublicWall.css'
import {CapsuleCard} from '../components/capsuleCards.jsx'
import '../classes/CapsuleData.jsx'
import {CapsuleListFromJson, dummyData } from '../classes/CapsuleData.jsx';
import axios from 'axios';
import * as API from '../apis/apis'
import ClipLoader from "react-spinners/ClipLoader";
import {trySettingIntervals, trySettingGroups} from '../utils/publicWallUtils.jsx'

const PublicWall = () => {    
    const { loading, ready, intervals, groups } = usePublicWallData();
    
    if(!ready)
        return(<div className="mainPage flex-col publicMain">Loading...</div>)

    return(
    <div className="mainPage flex-col publicMain">
        {loading && <div className='loaderDiv'><ClipLoader loading={loading} size={35} /></div>}
        <div className='publicTextDiv flex-col items-center'>
            <div className='bigPublicText'>Moments Shared by Others</div>
            <div className='smallPublicText'>Dig deep and explore!</div>
        </div>

        {intervals.map(interval => (
            <div key={interval}>
                <div className="publicYearDiv flex-col items-center">
                    {interval}s
                </div>
                <CapsuleList capsData={groups[interval]} />
            </div>
        ))}
    </div>
)}

//components
const CapsuleList = ({capsData}) =>  {

    const scrollRef = useRef(null)
    const scrollAmount = window.innerWidth * 0.9;
    const [isLeft, setIsLeft] = useState(true)
    const [isRight, setIsRight] = useState(false)

    //scroll logic + to make buttons disabled
    const scrollLeft = () => {
    scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
        });
    };

    const checkScrollPosition = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        setIsLeft(scrollLeft <= 0);
        setIsRight(scrollLeft + clientWidth >= scrollWidth - 1);
    };

    //add listerner to scroll
    useEffect(() => {
        scrollRef.current.addEventListener('scroll', checkScrollPosition);
        return () => scrollRef.current && scrollRef.current.removeEventListener('scroll', checkScrollPosition);
    }, []);

    return(
    <div className='capsuleListDiv'>
        
        <button className={'capsuleListScrollBtn capsuleListScrollBtnLeft' + (isLeft ? ' diabledBtn' : '')} onClick={scrollLeft}>&#60;</button>
        <button className={'capsuleListScrollBtn capsuleListScrollBtnRight' + (isRight ? ' diabledBtn' : '')} onClick={scrollRight}>&#62;</button>
        
        <div className='publicDisplayRow  flex-row' ref={scrollRef}>
            {
                capsData.map( item => (<CapsuleCard key={item.id} capData={item} />))
            }
        </div>

    </div>
)}

//functions
function callGetCapsules(setCapData) {
    console.log('getting Capsules..')
    axios.get(API.getPublicCapsulesApi)
    .then(respone => {
        console.log(respone)
        localStorage.setItem('publicCapsules', JSON.stringify(respone.data.payload));
        callGetUsers(respone.data.payload, setCapData)
    })
}

function callGetUsers(capsules, setCapData) {
    console.log('getting Users..')
    axios.get(API.getUsersApi)
    .then(respone => {
        console.log(respone)
        let usersData = respone.data.payload
        localStorage.setItem('users', JSON.stringify(usersData));

        //add users to their capsules
        setCapData(capsules.map(cap => {
            const user = usersData.find(user => user.id === cap.user_id) || null;
            return {...cap, 
                    user: user};
        }))
    })
}

//custom Hooks
const usePublicWallData = () => {
    const didMountGroup = useRef(false);
    const didMountInterval = useRef(false);

    const [capsData, setCapData] = useState();
    const [groups, setGroups] = useState();
    const [intervals, setIntervals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setLoading(true);
        callGetCapsules(setCapData);
    }, []);

    useEffect(() => {
        trySettingGroups(didMountGroup, setGroups, capsData);
    }, [capsData]);

    useEffect(() => {
        trySettingIntervals(didMountInterval, setIntervals, groups);
    }, [groups]);

    useEffect(() => {
        setReady(intervals.length > 0);
        setLoading(!(intervals.length > 0));
    }, [intervals]);

    return { loading, ready, intervals, groups };
}

export default PublicWall;