import React from 'react';

import styles from './styles';
import profilePic from '../../assets/profile-pic.jpg';

import {getClassNamesFromStyles} from '../../helpers/css';

class Bio extends React.Component {
  render() {
    const classNames = getClassNamesFromStyles(styles);

    return (
      <div className={classNames.wrapper}>
        <img
          src={profilePic}
          alt={`Dave Elliott`}
          className={classNames.avatar}
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
