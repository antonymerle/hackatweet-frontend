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
        <div className={styles.logoSmall}></div>
        <h1>See what's happening</h1>
        <h2>Join Hackatweet today</h2>
        <div className={styles.signContainer}>
          <button>Sign up</button>
          <p>Already have an account ?</p>
          <button>Sign in</button>
        </div>
      </div>
    </main>
  );
}

export default Signin;
