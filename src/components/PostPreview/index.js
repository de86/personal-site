import React from 'react';
import { Link } from 'gatsby';

import styles from './styles'

import {getClassNamesFromStyles} from '../../helpers/css';

const PostPreview = ({slug, title, excerpt, date}) => {
  const classNames = getClassNamesFromStyles(styles);

  return (
    <div className={classNames.row}>
        <div className={classNames.container}>
          <h3 className={classNames.title}>
            <Link className={classNames.titleLink} to={slug}>
              {title}
            </Link>
          </h3>
        <small>{date}</small>
        <p
          className={classNames.excerptText}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />
      </div>
    </div>
  );
};

export default PostPreview;