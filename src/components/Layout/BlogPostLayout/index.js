import React from 'react';
import { Link } from 'gatsby';

import DarkModeToggle from '../../DarkModeToggle';
import logow from '../../../assets/logow.svg';

import styles from "./styles.module.css";

class BlogPostLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: "dark"
    }

    this.onClickToggleDarkMode = this.onClickToggleDarkMode.bind(this);
  }

  componentDidMount () {
    const mode = localStorage.getItem('mode');
    console.log(mode)

    if (mode) {
      this.setState({mode});
    }
  }

  onClickToggleDarkMode () {
    const currentMode = this.state.mode;
    const mode = currentMode === "dark" ? "light" : "dark";
    this.setState({mode});
    localStorage.setItem('mode', mode);
  }

  render() {
    const { children, theme } = this.props;

    return (
      <div id={"site-wrapper"} className={styles.wrapper} data-theme={theme} data-mode={this.state.mode}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <Link to="/" rel="home">
                <img src={logow} alt="Dave Elliott's Blog" className={styles.logo} />
            </Link>
          </div>
        </div>
        {children}
        <DarkModeToggle updateMode={this.onClickToggleDarkMode} />
        <div className={styles.footer}>
            &copy; David Antony Elliott 2019
        </div>
      </div>
    );
  }
}

export default BlogPostLayout;
