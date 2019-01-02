import React from 'react';

import styles from './styles.module.css';
import profilePic from '../../assets/profile-pic.jpg';

class Bio extends React.Component {
  render() {

    return (
      <div className={styles.wrapper}>
        <img
          src={profilePic}
          alt={`Dave Elliott`}
          className={styles.avatar}
        />
        <p>
          Written by <strong>Dave Elliott</strong>. A front-end javascript developer
          from Manchester, England.{' '}
        </p>
      </div>
    );
  }
}

export default Bio;
