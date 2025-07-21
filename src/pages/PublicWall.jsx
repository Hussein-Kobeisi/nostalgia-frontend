import {useNavigate} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import '../styles/common.css'
import '../styles/PublicWall.css'
import {CapsuleCard} from './components/capsuleCards.jsx'
import '../classes/CapsuleData.jsx'
import {CapsuleListFromJson, dummyData } from '../classes/CapsuleData.jsx';
import axios from 'axios';
import * as API from '../apis/apis'
import ClipLoader from "react-spinners/ClipLoader";

const PublicWall = () => {    
    const didMountGroup = useRef(false);
    const didMountInterval = useRef(false);
    const [ready, setReady] = useState(false)
    const [capsData, setCapData] = useState()
    const [groups, setGroups] = useState()
    const [intervals, setIntervals] = useState([])
    
    useEffect(() => callGetCapsules(setCapData), []);
    useEffect(() => trySettingGroups(didMountGroup, setGroups, capsData), [capsData]);
    useEffect(() => trySettingIntervals(didMountInterval, setIntervals, groups), [groups]);
    useEffect(() => setReady(intervals != []), [intervals]);


    if(!ready)
        return(<div className="mainPage flex-col publicMain">Loading...</div>)

    return(
    <div className="mainPage flex-col publicMain">
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

    //map data from json
    //getDisplayData() give media counts instead of arrays

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
    axios.get(API.getPublicCapsulesApi)
    .then(respone => {
        localStorage.setItem('publicCapsules', JSON.stringify(respone.data.payload));
        callGetUsers(respone.data.payload, setCapData)
    })
}

function callGetUsers(capsules, setCapData) {
    axios.get(API.getUsersApi)
    .then(respone => {
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

function trySettingGroups(didMount, setGroups, capsData)
{
    if (didMount.current)
        setGroups(groupCapsByInterval(capsData));
    else
        didMount.current = true;
}

function groupCapsByInterval(capsData){
    const groups = {};

    capsData.forEach(cap => {
        const year = new Date(cap.open_date).getFullYear();
        const interval = Math.floor(year / 5) * 5;

        if (!groups[interval]) {
        groups[interval] = [];
        }
        groups[interval].push(cap);
    });

    return groups;
};

function trySettingIntervals(didMount, setIntervals, groups)
{
    if (didMount.current)
        setIntervals(Object.keys(groups).map(Number).sort((a, b) => b - a))
    else
        didMount.current = true;
}


export default PublicWall;