import { rhythm, scale } from '../../utils/typography'

export default {
  postDate: {
    ...scale(-1 / 5),
    display: 'block',
    marginBottom: rhythm(1),
    marginTop: rhythm(-0.7)
  },
  blogNavButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    listStyle: 'none',
    padding: 0
  },
  container: {
    margin: '50px auto 0',
    maxWidth: rhythm(24),

    '@media (max-width: 660px)': {
        marginLeft: '15px',
        marginRight: '15px'
    }
  },
}
