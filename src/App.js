import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import PublicWall from './pages/PublicWall.jsx';
import UserWall from './pages/UserWall.jsx';
import CapsulePage from './pages/CapsulePage.jsx';
import UserProfile from './pages/UserProfile.jsx';
import PageHeader from './pages/pageHeader.jsx';

import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


function App() {
    return (
        <div className='appContainer'>
            <BrowserRouter>
                <ConditionalPageHeader />
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/publicwall' element={<PublicWall />}></Route>
                    <Route path='/userwall' element={<UserWall />}></Route>
                    <Route path='/capsule' element={<CapsulePage />}></Route>
                    <Route path='/profile' element={<UserProfile />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

function ConditionalPageHeader() {
  const location = useLocation();
  const showHeader = ['/publicwall', '/userwall', '/capsule', '/profile'].includes(location.pathname);

  return (
    <>
      {showHeader && <PageHeader />}
    </>
      )}

export default App;
