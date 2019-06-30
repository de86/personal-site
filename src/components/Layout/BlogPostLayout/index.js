import React from 'react';
import { Link } from 'gatsby';

import logow from '../../../assets/logow.svg';

import styles from "./styles.module.css";

class BlogPostLayout extends React.Component {
  render() {
    const { children, theme } = this.props;

    return (
      <div className={styles.wrapper} data-theme={theme}>
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

export default BlogPostLayout;
