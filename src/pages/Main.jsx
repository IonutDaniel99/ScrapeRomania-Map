import React from 'react';
import Maps from '../components/Maps/Maps';
import NavBar from '../components/NavBar/NavBar';
import {MouseParallaxChild, MouseParallaxContainer} from 'react-parallax-mouse';

function Main() {

    window.addEventListener('touchstart', touchHandler, { passive: false });
    
    function touchHandler(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    return (
        <>
            <MouseParallaxContainer
                className="parallax w-screen h-screen "
                containerStyles={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }}
                resetOnLeave
            >
                <MouseParallaxChild
                    factorX={0.05}
                    factorY={0.05}
                >
                    <img width={'100%'} height={'100%'} draggable="false" className={'scale-105'} src="https://images.pexels.com/photos/326333/pexels-photo-326333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </MouseParallaxChild>
            </MouseParallaxContainer>
            <div className='h-screen w-screen flex justify-center items-center flex-col bg-white overflow-hidden'>
                <Maps />
                <NavBar />
            </div>
        </>
    );
}

export default Main;