import React from 'react';
import { Link } from 'gatsby';

import logow from '../../../assets/logow.svg';

import styles from "./styles.module.css";

class Template extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <Link to="/" rel="home">
                <img src={logow} alt="Dave Elliott's Blog" className={styles.logo} />
            </Link>
          </div>
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
