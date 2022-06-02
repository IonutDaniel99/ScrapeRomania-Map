import { auth } from "../config/firebase-config"

export const userAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken') !== "undefined" ? JSON.parse(localStorage.getItem('accessToken')) : localStorage.clear()
    return accessToken
}

export const fetchUser = () => {
    const accessToken = localStorage.getItem('user') !== "undefined" ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()
    return accessToken
}

export const getUserId = () => {
    var uuid ="";
    if (typeof window !== 'undefined') {
        uuid = JSON.parse(localStorage.getItem('uid'))
    }
    if (auth.currentUser) {
        uuid = auth.currentUser.uid
    }
    console.log('uuid:', uuid);
    return uuid;
}

export const fetchUserLocation = () => {
    const accessToken = localStorage.getItem('visited_locations') !== "undefined" ? JSON.parse(localStorage.getItem('visited_locations')) : localStorage.clear()
    return accessToken
}