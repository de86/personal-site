import React from 'react';
import { Link } from 'gatsby';

import {getClassNamesFromStyles} from '../../../helpers/css';

import styles from './styles';
import logogradient from '../../../assets/logogradient.svg';

class Template extends React.Component {
  render() {
    const { location, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    const classNames = getClassNamesFromStyles(styles);

    return (
      <div className={classNames.wrapper}>
        <div className={classNames.navContainer} />
        <div className={classNames.heroContainer}>
          <img src={logogradient} alt="Dave Elliott's Blog" className={classNames.logo} />
        </div>
        {children}
      </div>
    );
  }
}

export default Template;
