import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import styles from './styles';
import {getClassNamesFromStyles} from '../../helpers/css';

import Bio from '../../components/Bio';
import BlogPostLayout from '../../components/Layout/BlogPostLayout';

const classNames = getClassNamesFromStyles(styles);

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteDescription = post.excerpt;
    const { previous, next } = this.props.pageContext;

    return (
      <BlogPostLayout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <div className={classNames.container}>
            <h1>{post.frontmatter.title}</h1>
            <p className={classNames.postDate}>
                {post.frontmatter.date}
            </p>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <Bio />
            <ul className={classNames.blogNavButtons}>
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
      }
    }
  }
`;
