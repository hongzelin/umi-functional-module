import React from 'react';
import styles from './index.css';

export default function () {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>home</li>
      </ul>
    </div>
  );
}


// import React from "react";
// import Redirect from "umi/redirect"; // eslint-disable-line

// const index = () => <Redirect to="/users" />;

// export default index;
