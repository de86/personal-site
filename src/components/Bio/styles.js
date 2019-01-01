import { rhythm } from '../../utils/typography';

export default {
  wrapper: {
    display: 'flex',
    margin: `50px auto ${rhythm(1.5)}`,
    maxWidth: rhythm(24)
  },
  avatar: {
    marginRight: rhythm(1 / 2),
    marginBottom: 0,
    width: rhythm(2),
    height: rhythm(2),
    borderRadius: '100%'
  },
  divider: {
    marginBottom: rhythm(1)
  }
}
