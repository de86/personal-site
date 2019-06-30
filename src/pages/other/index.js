import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Layout from '../../components/Layout/HomeLayout';
import PostPreviewList from '../../components/PostPreviewList';

class BlogIndex extends React.Component {
    render() {
        const siteTitle = get(this, 'props.data.site.siteMetadata.title');
        const siteDescription = get(this, 'props.data.site.siteMetadata.description');
        const posts = get(this, 'props.data.allMarkdownRemark.edges');
    
        return (
          <Layout location={this.props.location}>
            <Helmet
              htmlAttributes={{ lang: 'en' }}
              meta={[{ name: 'description', content: siteDescription }]}
              title={siteTitle}
            />
            <PostPreviewList posts={posts} />
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
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { topic: { eq: "other" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            topic
          }
        }
      }
    }
  }
`;
