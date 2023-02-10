import React from "react";
import styles from "../styles/Tweet.module.css";
import egg from "../public/egg.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeTweet, likeTweet } from "@/reducers/tweets";
import { useState } from "react";

function Tweet({
  firstname,
  username,
  tweetDate,
  content,
  likes,
  tweetId,
  likedBy,
}) {
  const dispatch = useDispatch();
  /* CREATION USE SELECTOR */
  const connectedUser = useSelector((state) => state.user.value);
  console.log({ connectedUser });

  // const isLikedTweet = likedBy.includes(connectedUser.id);
  const [isLikedTweet, setIsLikedTweet] = useState(
    likedBy.includes(connectedUser.id)
  );

  /*   
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

  const handleLike = () => {
    // const tweetId = req.body.tweetId;
    // const likerId = connectedUser._id;
    console.log("enter handlelike");

    fetch(`https://hackatweet-backend-iota.vercel.app/tweets`, {
      // fetch(`http://localhost:3000/tweets`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likerId: connectedUser.id,
        tweetId: tweetId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("handleLike", data);
        // handleLike {liked: true, numberOfLikes: 1}
        console.log("dispatch : ", { ...data, tweetId });

        dispatch(likeTweet({ ...data, tweetId }));
        setIsLikedTweet(!isLikedTweet);
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
          <FontAwesomeIcon
            icon={faHeart}
            className={styles.heart}
            style={{ color: isLikedTweet ? "red" : "white" }}
            onClick={handleLike}
          />
          <span>{likes}</span>
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
