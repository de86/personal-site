import React from 'react';
import { Link } from 'gatsby';
import Themes from '../../enums/themes';

import styles from './styles.module.css';

const TopicsThemesMap = {
    [Themes.Dev]: 'Dev',
    [Themes.GameDev]: 'Game Dev',
    [Themes.Other]: 'Other',
}

const PostPreview = ({slug, title, excerpt, date, theme}) => {
    const topic = TopicsThemesMap[theme];

  return (
    <div className={styles.row} data-theme={theme}>
        <div className={styles.container}>
          <h3 className={styles.title}>
            <Link className={styles.titleLink} to={slug}>
              {title}
            </Link>
          </h3>
        <small>{date}</small>
        <p
          className={styles.excerptText}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
        <span className={styles.topic}>{topic}</span>
      </div>
    </div>
  );
};

export default PostPreview;