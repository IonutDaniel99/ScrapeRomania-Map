import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { child, get, getDatabase, ref } from "firebase/database";
import { writeDataToFirebase } from "../utils/firebaseUtils";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { firebaseApp } from "../config/firebase-config";

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const db = getDatabase(firebaseApp);

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      get(child(ref(db), `users/${user.uid}/visited_locations`))
        .then((snapshot) => {
          if (!snapshot.exists()) {
            writeDataToFirebase(`users/${user.uid}`, {
              visited_locations: { 0: 0 },
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      navigate("/main");
    }
  }, [user]);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white relative">
      <video
        muted
        loop
        autoPlay
        className="absolute object-cover w-full h-full"
      >
        <source src="media/romania.mp4" type="video/webm" />
        Sorry, your browser doesnt support embedded videos.
      </video>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-30"></div>
      <div className="flex justify-center items-center flex-col z-10 mb-48">
        <h1 className="text-white font-bold italic 2xl:text-8xl md:text-6xl text-5xl mb-12 text-center">
          Scrape Romania Map
        </h1>
        <div
          onPointerDown={handleGoogleSignIn}
          className="flex justify-center items-center border-gray-700 border-2 rounded-full
                p-2 bg-white cursor-pointer hover:border-blue-600 hover:border-2 hover:shadow-md hover:scale-110 duration-1000 ease-in-out
      "
        >
          <FcGoogle fontSize={40} />
          <p className="text-lg font-semibold ml-4 mr-4">Sign in with Google</p>
        </div>
      </div>
      <p className="fixed text-white 5xl z-10 bottom-10 left-0 w-full text-center">
        Created by <b>Ionut Remus</b>
      </p>
    </div>
  );
};

export default Login;
