import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import PublicWall from './pages/PublicWall.jsx';
import UserWall from './pages/UserWall.jsx';
import CapsulePage from './pages/CapsulePage.jsx';
import UserProfile from './pages/UserProfile.jsx';

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/publicwall' element={<PublicWall />}></Route>
                <Route path='/userwall' element={<UserWall />}></Route>
                <Route path='/capsule' element={<CapsulePage />}></Route>
                <Route path='/profile' element={<UserProfile />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
