import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Maps from '../../components/Maps/Maps';
import NavBar from '../../components/NavBar/NavBar';
import { fetchUser } from '../../utils/fetchUserDetails';

function MainComponent() {

    const navigate = useNavigate();
    window.addEventListener("touchstart", touchHandler, { passive: false });
    function touchHandler(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }
    const [user, setUser] = useState();
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            localStorage.setItem('uid', JSON.stringify(user.uid));
        }
    });

    useEffect(() => {
        const userInfo = fetchUser();
        if (userInfo == null) navigate('/');
        setUser(userInfo[0]);
    }, []);

    return (
        <div className='h-screen flex justify-center items-center flex-col bg-white  overflow-hidden'>
            <Maps />
            <NavBar userData={user} />
        </div>
    );
}

export default MainComponent;