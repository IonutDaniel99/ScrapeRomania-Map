import React, {useEffect, useState} from 'react';

const SvgDisplay = ({svg_ref, imageFill, locationId, location, isPanMoving, locationModalLogic, setLocationDetails}) => {

    const pointerUp = () =>{
        if (isPanMoving === false) {
            locationModalLogic(locationId);
            setLocationDetails(location.card_data);
        }
    };


    if (imageFill) {
        return (
            <svg ref = {svg_ref} strokeWidth='.50'>
                <defs>
                    <pattern id={'img_pattern_' + locationId} patternUnits="userSpaceOnUse" width="600" height="1000">
                        <image href={location.card_data.image_url} x="0" y="0" width="400" height="400" />
                    </pattern>
                    <filter id="white-glow" x="-5000%" y="-5000%" width="10000%" height="10000%">
                        <feFlood result="flood" floodColor="#facc15" floodOpacity=".8"></feFlood>
                        <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                        <feMorphology in="mask" result="dilated" operator="dilate" radius="2"></feMorphology>
                        <feGaussianBlur in="dilated" result="blurred" stdDeviation="2"></feGaussianBlur>
                        <feMerge>
                            <feMergeNode in="blurred"></feMergeNode>
                            <feMergeNode in="SourceGraphic"></feMergeNode>
                        </feMerge>
                    </filter>
                </defs>
                <g xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth=".60" fill="#FFFFFF" aria-valuetext="test" >
                    <path d={location.path} 
                        filter={'url(#white-glow)'}
                        onPointerUp={() => pointerUp()}/>
                </g>
            </svg>
        );
    } else {
        return (
            <svg ref={svg_ref} strokeWidth='.50'>
                <g xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth=".60" fill="#FFFFFF" aria-valuetext="test" >
                    <path d={location.path}
                        onPointerUp={() => pointerUp()}
                        //TODO: this imageFill or this location.card_data.image_url
                        fill={location.card_data.image_url !== '' ? 'green': 'white'} />
                </g>
            </svg>
        );
    }

};

export default SvgDisplay;