import React from "react";
import styles from "../styles/Homecomponent.module.css";
import Image from "next/image";
import logo from "../public/logo.png";
import egg from "../public/egg.jpg";

function Home() {
  const handleLogout = () => {
    console.log("LOGOUT:", {});

    // TODO : reset store redux
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
      <section className={styles.centerColumn}>centerColumn</section>
      <section className={styles.rightColumn}>rightColumn</section>
    </main>
  );
}

export default Home;
