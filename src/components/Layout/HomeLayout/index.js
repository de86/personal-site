import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.css';
import logogradient from '../../../assets/logogradient.svg';

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    return (
      <div className={styles.wrapper}>
        <div className={styles.gradientFill} />
        <div className={styles.heroContainer}>
          <img src={logogradient} alt="Dave Elliott's Blog" className={styles.logo} />
        </div>
        {children}
        <div className={styles.footer}>
            &copy; David Antony Elliott 2019
        </div>
      </div>
    );
  }
}

export default Template;
