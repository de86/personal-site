import React from 'react';
import { Link } from 'gatsby';

import styles from './styles.module.css';

const PostPreview = ({slug, title, excerpt, date, theme}) => {
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
      </div>
    </div>
  );
};

export default PostPreview;