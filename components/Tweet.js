import React from "react";
import styles from "../styles/Tweet.module.css";
import egg from "../public/egg.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeTweet } from "@/reducers/tweets";

function Tweet({ firstname, username, tweetDate, content, likes, tweetId }) {
  const dispatch = useDispatch();
  /* CREATION USE SELECTOR */
  /*   const user = useSelector((state) => state.user.value);
  const infosTweet = useSelector((state) => state.tweets.value);

  console.log('infosTweet :',infosTweet); */

  /* DELETE D'UN TWEET */

  const deleteTweet = () => {
    fetch(`https://hackatweet-backend-iota.vercel.app/tweets/deleteTweet`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        tweetId: tweetId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("clg line 31 : ", data.result);
        dispatch(removeTweet({ tweetId }));
      });
  };

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <Image src={egg} width={50} alt="pp" className={styles.pp} />
        <div className={styles.headerText}>
          <h4 className={styles.authorFirstName}>{firstname}</h4>
          <h5 className={styles.authorUserName}>{username}</h5>
          <p className={styles.tweetDate}>{tweetDate}</p>
        </div>
      </div>
      <div className={styles.tweetContent}>{content}</div>
      <div className={styles.tweetFooter}>
        <div className={styles.likes}>
          <FontAwesomeIcon icon={faHeart} className={styles.heart} />
          <span>1</span>
        </div>
        <div className={styles.delete}>
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={deleteTweet}
            className={styles.trashCan}
          />
        </div>
      </div>
    </div>
  );
}

export default Tweet;
