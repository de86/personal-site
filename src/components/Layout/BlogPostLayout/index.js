import React from 'react';
import { Link } from 'gatsby';

import {getClassNamesFromStyles} from '../../../helpers/css';

import styles from './styles';
import logow from '../../../assets/logow.svg'

class Template extends React.Component {
  render() {
    const { children } = this.props;

    const classNames = getClassNamesFromStyles(styles);

    return (
      <div className={classNames.wrapper}>
        <div className={classNames.navContainer}>
          <div className={classNames.navContent}>
            <Link to="/" rel="home">
                <img src={logow} alt="Dave Elliott's Blog" className={classNames.logo} />
            </Link>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

export default Template;
