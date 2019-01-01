import { rhythm, scale } from '../../../utils/typography'

const particlesYOffset = 200;

export default {
  wrapper: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  heroContainer: {
    textAlign: 'center'
  },
  navContainer: {
    height: '10px',
    backgroundImage: 'linear-gradient(20deg, #02f4d0, #8f02f4)',
    boxShadow: ' 0px -11px 78px -7px rgba(0,0,0,0.75)'
  },
  logo: {
      display: 'block',
      width: '200px',
      padding: '45px 0',
      margin: '0 auto',
      verticalAlign: 'middle'
  },
  title: {
    ...scale(1.5),
    display: 'block',
    paddingTop: '70px',
    textAlign: 'center',
    zIndex: 10,
    color: '#f5f5f5'
  },
  linkLogo: {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'inherit'
  }
}
