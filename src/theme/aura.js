import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';

export default {
  title: 'Alton',
  baseFontSize: '18px',
  baseLineHeight: 1.45,
  blockMarginBottom: 0.8,
  googleFonts: [
    {
      name: 'Domine',
      styles: ['700'],
    },
    {
      name: 'Open Sans',
      styles: ['400', '400i', '700', '700i'],
    },
  ],
  headerFontFamily: ['Domine', 'sans-serif'],
  bodyFontFamily: ['Open Sans', 'sans-serif'],
  bodyColor: 'black',
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    '[data-theme="game-dev"] h1, [data-theme="game-dev"] h2, [data-theme="game-dev"] h3, [data-theme="game-dev"] h4, [data-theme="game-dev"] h5': {
      color: '#fb50b0',
    },
    '[data-theme="dev"] h1, [data-theme="dev"] h2, [data-theme="dev"] h3, [data-theme="dev"] h4, [data-theme="dev"] h5': {
        color: '#38a2dc',
    },
    '[data-theme="other"] h1, [data-theme="other"] h2, [data-theme="other"] h3, [data-theme="other"] h4, [data-theme="other"] h5': {
        color: '#30dc59',
    },
    h2: {
        marginTop: '55px'
    },
    p: {
      lineHeight: '1.7em'
    },
    a: {
      color: '#9052c6',
      textDecoration: 'none',
    },
    'a:hover, a:active': {
      color: '#a426e0',
      textDecoration: 'underline',
    },
    '[data-theme="game-dev"] a': {
        color: '#fb5079',
        textDecoration: 'none',
    },
    '[data-theme="game-dev"] a:hover, [data-theme="game-dev"] a:active, [data-theme="game-dev"] a:visited': {
        color: '#fb5079',
        textDecoration: 'underline',
    },
    blockquote: {
      ...scale(1 / 5),
      backgroundColor: '#f2f2f2',
      color: '#38a2dc',
      fontStyle: 'italic',
      padding: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid #38a2dc`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    '[data-theme="dev"] blockquote': {
        backgroundColor: '#f2f2f2',
        color: '#38a2dc',
        borderLeft: `${rhythm(3 / 16)} solid #38a2dc`,
    },
    '[data-theme="game-dev"] blockquote': {
        backgroundColor: '#f9f4f0',
        color: '#fb50b0',
        borderLeft: `${rhythm(3 / 16)} solid #fb50b0`,
    },
    '[data-theme="other"] blockquote': {
        backgroundColor: '#d5ecdb',
        color: '#30dc59',
        borderLeft: `${rhythm(3 / 16)} solid #30dc59`,
    },
    pre: {
        backgroundColor: '#f0f6f8',
        borderRadius: '3px',
        padding: '15px',
        overflow: 'scroll'
    },
    [MOBILE_MEDIA_QUERY]: {
      html: {
        fontSize: `${16 / 16 * 100}%`,
      },
      blockquote: {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
  }),
}
