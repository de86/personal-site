import React from 'react';

import styles from './styles.module.css';

class DarkModeToggle extends React.Component {
  render() {
    return (
      <div id={"dark-mode-toggle"} className={styles.darkModeToggle} onClick={this.props.updateMode}>
        <h1>&#9728;</h1>
      </div>
    );
  }
}

export default DarkModeToggle;
