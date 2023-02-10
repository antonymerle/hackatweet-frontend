import React from "react";
import { useState } from "react";
import styles from "../styles/Signin.module.css";
import Image from "next/image";
import logo from "../public/logo.png";
import { useDispatch } from "react-redux";
import { signUp, signIn } from "../reducers/user";
import { Redirect } from 'react-router-dom';


function Signin() {
  const dispatch = useDispatch();

  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [signUpFirstname, setSignUpFirstname] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const showSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const showSigninModal = () => {
    setIsSigninModalOpen(true);
  };

  const closeSigninModal = () => {
    setIsSigninModalOpen(false);
  };

  const handleSignup = () => {
    setSignUpFirstname("");
    setSignUpUsername("");
    setSignUpPassword("");

    fetch("https://hackatweet-backend-iota.vercel.app/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: signUpFirstname,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(signUp(data.data));
        console.log("dispatch OK", data);
        console.log(data.result);
        if (data.result) {
        setIsLoggedIn(true);        
        }
      });
  };

  const handleSignin = () => {
    setSignInUsername("");
    setSignInPassword("");

    fetch("https://hackatweet-backend-iota.vercel.app/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result, data.error);
      });
  };

  const signupModal = (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.closeModal}>
          <p onClick={closeSignupModal}>X</p>
        </div>
        <Image src={logo} width={50} alt="Logo"></Image>
        <div className={styles.modalForm}>
          <input
            type="text"
            placeholder="Firstname"
            id="signUpFirstname"
            onChange={(e) => setSignUpFirstname(e.target.value)}
            value={signUpFirstname}
            className={styles.modalInput}
          />
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
            className={styles.modalInput}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            className={styles.modalInput}
          />
          <button
            className={styles.signupModalBtn}
            onClick={() => handleSignup()}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );

  const signinModal = (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.closeModal}>
          <p onClick={closeSigninModal}>X</p>
        </div>
        <Image src={logo} width={50} alt="Logo"></Image>
        <div className={styles.modalForm}>
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
            className={styles.modalInput}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
            className={styles.modalInput}
          />
          <button
            className={styles.signupModalBtn}
            onClick={() => handleSignin()}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );

/*   if (isLoggedIn) {
    return <Redirect to="/" />;
  } */

  return (
    <main id="main" className={styles.main}>
      <div className={styles.left}>
        <Image src={logo} width={300} alt="Logo"></Image>
      </div>

      <div className={styles.right}>
        <div className={styles.rightContainer}>
          <Image src={logo} width={50} alt="Logo"></Image>
          <h1>See what's happening</h1>
          <h2>Join Hackatweet today</h2>
          <div className={styles.signContainer}>
            {isSignupModalOpen && signupModal}

            {isSigninModalOpen && signinModal}

            <button
              className={styles.signupBtn}
              onClick={() => showSignupModal()}
            >
              Sign up
            </button>
            <h3>Already have an account ?</h3>
            <button
              className={styles.signinBtn}
              onClick={() => showSigninModal()}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;
