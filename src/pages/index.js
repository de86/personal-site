import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Bio from '../components/Bio';
import Layout from '../components/Layout/HomeLayout';
import PostPreview from '../components/PostPreview';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(this, 'props.data.site.siteMetadata.description');
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    const postPreviews = posts.map(({ node }, i) => {
      const title = get(node, 'frontmatter.title') || node.fields.slug
      return (
        <PostPreview
          key={`${i}-${node.fields.slug}`}
          date={node.frontmatter.date}
          slug={node.fields.slug}
          title={title}
          excerpt={node.excerpt}
        />
      )
    });

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        {postPreviews}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`;
