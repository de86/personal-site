import React from 'react';

import styles from './styles.module.css';

import Hero from '../../Hero';
import DarkModeToggle from '../../DarkModeToggle';

class HomeLayout extends React.Component {
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
    const {theme} = this.props;

    return (
      <div id={"site-wrapper"} className={styles.wrapper} data-theme={theme} data-mode={this.state.mode}>
        <div className={styles.gradientFill}/>
        <Hero theme={theme}/>
        {this.props.children}
        <DarkModeToggle updateMode={this.onClickToggleDarkMode} />
        <div className={styles.footer}>
            &copy; David Antony Elliott 2019
        </div>
      </div>
    );
  }
}

export default HomeLayout;
