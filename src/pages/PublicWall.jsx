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
    const [capsulesReady, setCapsulesReady] = useState(false)
    const [usersReady, setUsersReady] = useState(false)
    const [capsData, setCapData] = useState()
    
    useEffect(() => callGetCapsules(), []);

    function callGetCapsules() {
        axios.get(API.getPublicCapsulesApi)
        .then(respone => {
            localStorage.setItem('publicCapsuleJsonData', JSON.stringify(capsData));
            setCapsulesReady(true)
            callGetUsers(respone.data.payload)
        })
    }

    function callGetUsers(capsules) {
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

            setUsersReady(true)
        })
    }

    if(!(capsulesReady && usersReady))
        return(<div className="mainPage flex-col publicMain">Loading...</div>)

    return(
    <div className="mainPage flex-col publicMain">
        <div className='publicTextDiv flex-col items-center'>
            <div className='bigPublicText'>Moments Shared by Others</div>
            <div className='smallPublicText'>Dig deep and explore!</div>
        </div>

        <div className='publicYearDiv flex-col items-center'>
            2020s
        </div>
        <CapsuleList capsData={capsData}/>
        
        <div className='publicYearDiv flex-col items-center'>
            2015s
        </div>
        <CapsuleList capsData={capsData}/>

        <div className='publicYearDiv flex-col items-center'>
            2010s
        </div>
        <CapsuleList capsData={capsData}/>
    </div>
)}

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



export default PublicWall;