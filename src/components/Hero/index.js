import React from 'react';
import {Link} from 'gatsby';

import styles from './styles.module.css';
import Themes from '../../enums/themes';

import logo_gradient_blue from '../../assets/logo_gradient_blue.svg';
import logo_gradient_orange from '../../assets/logo_gradient_orange.svg';
import logo_gradient_green from '../../assets/logo_gradient_green.svg';

const Hero = ({theme}) => {
    let logo = logo_gradient_blue;

    console.log(theme)
    switch (theme) {
        case Themes.GameDev:
            logo = logo_gradient_orange;
            break;

        case Themes.Other:
            logo = logo_gradient_green;
            break;

        default:
            break;
    }

    return (
        <div className={styles.heroContainer}>
            <Link to="/">
                <img src={logo} alt="Dave Elliott's Blog" className={styles.logo} />
            </Link>
        </div>
    )
}

export default Hero;
