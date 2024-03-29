/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_PUBLIC_FIREBASE_DATABASE_URL,
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const database = getDatabase(firebaseApp)
export const auth = getAuth()
