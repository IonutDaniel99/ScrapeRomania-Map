import React from 'react';
import Maps from '../components/Maps/Maps';
import NavBar from '../components/NavBar/NavBar';
import {Box, Button, Fade, Modal, Typography} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Main() {

    window.addEventListener('touchstart', touchHandler, { passive: false });
    
    function touchHandler(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className='h-screen w-screen flex justify-center items-center flex-col bg-white overflow-hidden'>
                <img draggable="false" className={'scale-105 absolute w-full h-full object-cover'} src="https://images.pexels.com/photos/326333/pexels-photo-326333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                <Maps />
                <div className={'absolute top-5 right-6 h-8 w-8 fill-amber-50 cursor-pointer'}>
                    <HelpOutlineIcon onClick={handleOpen} sx={{
                        width: '2rem',
                        height: '2rem',
                        color: 'white',
                    }}/>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '1px solid #000',
                                boxShadow: 24,
                                p: 4,
                                borderRadius: 2,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <InfoOutlinedIcon
                                        sx={{
                                            width: '2rem',
                                            height: '2rem',
                                            color: 'black',
                                            mr: 2
                                        }}/>
                                    <Typography id="transition-modal-description">
                                        Informations
                                    </Typography>
                                </Box>
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    -Hold ALT key and use mouse to move the map.
                                </Typography>
                                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                    -Other info
                                </Typography>
                            </Box>
                        </Fade>
                    </Modal>
                </div>
                <NavBar />
            </div>
        </>
    );
}

export default Main;