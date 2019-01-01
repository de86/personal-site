import { rhythm } from '../../utils/typography';

export default {
  row: {
    padding: '20px 0',

    ':first-child': {
      paddingTop: 0
    },

    ':hover': {
      backgroundColor: '#f3f3f3'
    }
  },
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: rhythm(24)
  },
  title: {
    marginBottom: 0
  },
  titleLink: {
    boxShadow: 'none',
    color: '#38a2dc',

    ':hover': {
      color: '#38a2dc'
    }
  },
  excerptText: { margin: '12px 0 0' },
}