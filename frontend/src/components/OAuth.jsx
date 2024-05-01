import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();
  function generateUsername(displayName) {
    let username = displayName.replace(/\s/g, "");
    let randomNumber = Math.floor(Math.random() * 900) + 100;
    username += randomNumber.toString();

    return username;
  }

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const { displayName, email, photoURL } = result.user;

      const userName = generateUsername(displayName);

      const googleAuthResponse = await axios.post(
        "http://localhost:3000/api/auth/google",
        { userName: userName, userEmail: email, userAvatar: photoURL },
        { withCredentials: true }
      );

      if (googleAuthResponse.data.success === true) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Couldn't sign in using google" + error);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-red-700  text-white p-3 rounded"
      >
        OAuth
      </button>
    </>
  );
};

export default OAuth;
