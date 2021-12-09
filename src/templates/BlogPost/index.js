import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import {getTheme} from '../../utils/utilities';
import styles  from './styles.module.css';

import Bio from '../../components/Bio';
import BlogPostLayout from '../../components/Layout/BlogPostLayout';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const theme = getTheme(this.props.location.pathname);
    const siteDescription = post.excerpt;
    const { previous, next } = this.props.pageContext;

    return (
      <BlogPostLayout location={this.props.location} theme={theme}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <div className={styles.container}>
            <h1 className={styles.title}>{post.frontmatter.title}</h1>
            <p className={styles.postDate}>
                {post.frontmatter.date}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <Bio />
            <ul className={styles.blogNavButtons}>
            <li>
                {
                previous &&
                <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                </Link>
                }
            </li>
            <li>
                {
                next &&
                <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                </Link>
                }
            </li>
            </ul>
        </div>
      </BlogPostLayout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        topic
      }
    }
  }
`;
