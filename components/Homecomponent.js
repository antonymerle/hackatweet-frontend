import React from "react";
import { useState } from "react";
import styles from "../styles/Homecomponent.module.css";
import Image from "next/image";
import logo from "../public/logo.png";
import egg from "../public/egg.jpg";
import { useSelector } from 'react-redux';

function Home() {
  const [tweetContent, setTweetContent] = useState("");

  const user = useSelector((state) => state.user.value);

  console.log('utilisateur : ',user);

  const handleLogout = () => { //deconnexion
    console.log("LOGOUT:", {});
    // TODO : reset store redux
  };

  const handleTweet = () => {
    if (!tweetTooLong()) {
     
      fetch (`https://hackatweet-backend-iota.vercel.app/tweets/createTweet`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content:tweetContent,
          username:user.username,
          avatar:user.avatar,
        })
      })
      .then (response =>response.json())
      .then (data=>{
        console.log("TWEET:", {data});
      })

    } else {
      console.log("TWEET TO LONG");
    }
  };

  const tweetTooLong = () => {
    return tweetContent.length > 280;
  };

  return (
    <main className={styles.container}>
      <section className={styles.leftColumn}>
        <Image src={logo} width={50} alt="Logo" />
        <div className={styles.userSection}>
          <div className={styles.userContainer}>
            <Image src={egg} width={50} alt="pp" className={styles.pp} />
            <div className={styles.usernameContainer}>
              <h4>John</h4>
              <h5>@JohnCena</h5>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
      <section className={styles.centerColumn}>
        <div className={styles.newTweetContainer}>
          <h3>Home</h3>
          <div className={styles.inputContainer}>
            <textarea
              name="tweet"
              placeholder="What's up ?"
              id=""
              cols="5"
              rows="1"
              className={styles.tweetInput}
              onChange={(e) => setTweetContent(e.target.value)}
            ></textarea>
            <div className={styles.fireTweet}>
              <p className={tweetTooLong() && styles.tweetTooLong}>
                {tweetContent.length}/280
              </p>
              <button
                className={
                  tweetTooLong() ? styles.tweetBtnDisabled : styles.tweetBtn
                }
                onClick={handleTweet}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.rightColumn}>rightColumn</section>
    </main>
  );
}

export default Home;
