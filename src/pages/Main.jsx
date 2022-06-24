import React from 'react';
import Maps from '../components/Maps/Maps';
import NavBar from '../components/NavBar/NavBar';

function Main() {

    window.addEventListener("touchstart", touchHandler, { passive: false });
    
    function touchHandler(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    return (
        <div className='h-screen flex justify-center items-center flex-col bg-white overflow-hidden'>
            <img className={'absolute top-0 left-0 w-full h-full flex justify-center items-center z-0'}
                 src={'https://images.pexels.com/photos/326333/pexels-photo-326333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                 alt={'cat'}/>
            <Maps />
            <NavBar />
        </div>
    );
}

export default Main;