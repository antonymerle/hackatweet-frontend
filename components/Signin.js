import React from "react";
import styles from "../styles/Signin.module.css";
import Image from "next/image";
import logo from "../public/logo.png";

function Signin() {
  return (
    <main id="main" className={styles.main}>
      <div className={styles.left}>
        <Image src={logo} width={300}></Image>
      </div>

      <div className={styles.right}>
        <div className={styles.rightContainer}>
          <Image src={logo} width={50}></Image>
          <h1>See what's happening</h1>
          <h2>Join Hackatweet today</h2>
          <div className={styles.signContainer}>
            <button className={styles.signup}>Sign up</button>
            <h3>Already have an account ?</h3>
            <button className={styles.signin}>Sign in</button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;
