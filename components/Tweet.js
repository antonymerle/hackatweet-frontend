import React from "react";
import styles from "../styles/Tweet.module.css";
import egg from "../public/egg.jpg";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Tweet({ firstname, username, tweetDate, content, likes }) {
  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <Image src={egg} width={50} alt="pp" className={styles.pp} />
        <h4 className={styles.authorFirstName}>{firstname}</h4>
        <h5 className={styles.authorUserName}>{username}</h5>
        <p className={styles.tweetDate}>{tweetDate}</p>
      </div>
      <div className={styles.tweetContent}>{content}</div>
      <div className={styles.tweetFooter}>
        <div className="likes">
          <faHeart />
          <span>1</span>
        </div>
        <faTrashCan />
        <span>0</span>
      </div>
    </div>
  );
}

export default Tweet;
