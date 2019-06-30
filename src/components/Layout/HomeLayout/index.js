import React from 'react';

import styles from './styles.module.css';
import Themes from '../../../enums/themes';

import Navigation from '../../Navigation';
import Hero from '../../Hero';


const themes = [Themes.Dev, Themes.GameDev, Themes.Other]

function getTheme(pathname) {
    const topic = pathname.replace('/', '');

    if (themes.find(theme => theme === topic )) {
        return topic
    } else {
        return themes[Math.floor(Math.random() * themes.length)]
    }
}


class HomeLayout extends React.Component {
  render() {
    const theme = getTheme(this.props.location.pathname);

    return (
      <div className={styles.wrapper} data-theme={theme}>
        <div className={styles.gradientFill}/>
        <Hero theme={theme}/>
        <Navigation />
        {this.props.children}
        <div className={styles.footer}>
            &copy; David Antony Elliott 2019
        </div>
      </div>
    );
  }
}

export default HomeLayout;
