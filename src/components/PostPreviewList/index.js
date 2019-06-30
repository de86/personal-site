import React from 'react';
import get from 'lodash/get';

import PostPreview from '../PostPreview';

const PostPreviewList = ({posts}) => {
    return posts.map(({ node }, i) => {
        const title = get(node, 'frontmatter.title') || node.fields.slug

        return (
          <PostPreview
            key={`${i}-${node.fields.slug}`}
            date={node.frontmatter.date}
            slug={node.fields.slug}
            title={title}
            excerpt={node.excerpt}
            theme={node.frontmatter.topic}
          />
        )
      });
}

export default PostPreviewList;
