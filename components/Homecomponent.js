import React, { useEffect } from "react";
import { useState } from "react";
import styles from "../styles/Homecomponent.module.css";
import Image from "next/image";
import logo from "../public/logo.png";
import egg from "../public/egg.jpg";
import { useSelector, useDispatch } from "react-redux";
import Tweet from "./Tweet";
import { fetchAllTweets } from "@/reducers/tweets";

function Home() {
  const dispatch = useDispatch();
  /*  CREATION DES STATES */

  const [tweetContent, setTweetContent] = useState("");
  const [lastTweetCreate, setLastTweetCreate] = useState({});
  // const [allTweets, setAllTweets] = useState([]);

  const allTweets = useSelector((state) => state.tweets.value);
  console.log({ allTweets });

  /* CREATION USE SELECTOR */
  const user = useSelector((state) => state.user.value);

  /* CREATION D'UN MODEL TWEET */

  /*  FONCTION DE DECONNEXION */
  const handleLogout = () => {
    console.log("LOGOUT:", {});
    // TODO : reset store redux
  };

  /* VU DE TOUS LES TWEETS */

  useEffect(() => {
    fetch("https://hackatweet-backend-iota.vercel.app/tweets/viewTweet")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);

        dispatch(fetchAllTweets(data.results));
      });
  }, [lastTweetCreate]);

  const tweetsDisplay = allTweets.map((element, i) => {
    return (
      <Tweet
        content={element.content}
        firstname={element.firstname}
        username={element.username}
        likes={element.likesNumber}
        likedBy={element.likedBy}
        key={i}
        tweetId={element._id}
        tweetDate={new Date().getTime()}
      />
    );
  });

  /* FONCTION AJOUT D'UN TWEET */

  const handleTweet = () => {
    if (!tweetTooLong()) {
      setTweetContent("");
      fetch(`https://hackatweet-backend-iota.vercel.app/tweets/createTweet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: tweetContent,
          username: user.username,
          avatar: user.avatar,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("TWEET:", { data });

          if (data.result) {
            setLastTweetCreate({
              content: data.newTweet.content,
              firstname: data.newTweet.firstname,
              username: data.newTweet.username,
              likes: data.newTweet.like,
              tweetId: data.newTweet._id,
            });
          }
        });
    } else {
      console.log("TWEET TO LONG");
    }

    setTweetContent(""); //Remise à zero du tweetContent
  };

  /*  VERIF DE LA TAILLE DU TWEET */
  const tweetTooLong = () => {
    return tweetContent.length > 280;
  };

  /*  RETURN */

  return (
    <main className={styles.container}>
      {/* USER COLUMN */}
      <section className={styles.leftColumn}>
        <Image src={logo} width={50} alt="Logo" />
        <div className={styles.userSection}>
          <div className={styles.userContainer}>
            <Image src={egg} width={50} alt="pp" className={styles.pp} />
            <div className={styles.usernameContainer}>
              <h4>{user.firstname}</h4>
              <h5>{user.username}</h5>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      {/* TWEET COLUMN */}
      <section className={styles.centerColumn}>
        {/* TWEET COLUMN > NEW TWEET*/}
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
              value={tweetContent}
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
        {/* TWEET COLUMN > FEED*/}

        <div className={styles.feed}>{tweetsDisplay}</div>
        {/*  {allTweets} */}
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
