import React from "react";
import { useState } from "react";
import styles from "../styles/Homecomponent.module.css";
import Image from "next/image";
import logo from "../public/logo.png";
import egg from "../public/egg.jpg";

function Home() {
  const [tweetContent, setTweetContent] = useState("");

  const handleLogout = () => {
    console.log("LOGOUT:", {});
    // TODO : reset store redux
  };

  const handleTweet = () => {
    if (!tweetTooLong()) {
      // TODO : POST tweet to backend
      console.log("TWEET:", {});
    } else {
      console.log("TWEET TO LONG");
    }
  };

  const tweetTooLong = () => {
    return tweetContent.length > 280;
  };

  return (
    <main className={styles.container}>
      {/* USER COLUMN */}
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

      {/* TWEET COLUMN */}
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
      {/* TRENDS COLUMN */}
      <section className={styles.rightColumn}>
        <h3>Trends</h3>
        <div className={styles.trendsContainer}>
          <ol className={styles.trendsList}>
            <li className={styles.trend}>
              <h5>
                {" "}
                <span className={styles.hashtag}>#</span>hackatweet
              </h5>
              <p>
                <span>2</span> Tweets
              </p>
            </li>
            <li className={styles.trend}>
              {" "}
              <h5>
                <span className={styles.hashtag}>#</span>first
              </h5>
              <p>
                <span>1</span> Tweet
              </p>
            </li>
            <li className={styles.trend}>
              {" "}
              <h5>
                {" "}
                <span className={styles.hashtag}>#</span>cenation
              </h5>
              <p>
                <span>1</span> Tweet
              </p>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}

export default Home;
