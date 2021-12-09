import React from 'react';
import get from 'lodash/get';

import PostPreview from '../PostPreview';

const PostPreviewList = ({posts, theme}) => {
    return posts.map(({ node }, i) => {
        const title = get(node, 'frontmatter.title') || node.fields.slug

        return (
          <PostPreview
            key={`${i}-${node.fields.slug}`}
            date={node.frontmatter.date}
            slug={node.fields.slug}
            title={title}
            excerpt={node.excerpt}
            theme={theme}
          />
        )
      });
}

export default PostPreviewList;
