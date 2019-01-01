import Typography from 'typography';
import auraTheme from '../theme/aura';

const typography = new Typography(auraTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
};

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
