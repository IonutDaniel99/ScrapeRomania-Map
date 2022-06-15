import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Maps from '../components/Maps/Maps';
import NavBar from '../components/NavBar/NavBar';
import { fetchUser } from '../utils/fetchUserDetails';

function Main() {
    const navigate = useNavigate();

    window.addEventListener("touchstart", touchHandler, { passive: false });
    
    function touchHandler(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    return (
        <div className='h-screen flex justify-center items-center flex-col bg-white  overflow-hidden'>
            <Maps />
            <NavBar />
        </div>
    );
}

export default Main;