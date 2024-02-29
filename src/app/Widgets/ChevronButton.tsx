// components/ChevronButton.js
import React from 'react';
import styles from './chevronButton.module.css'; // Import your CSS module


const ChevronButton = () => {
  return (
    <button className={styles.chevronButton}>
      <span>Submit </span>
      <span>&#8250;</span> {/* Right-pointing chevron */}
    </button>
  );
};

export default ChevronButton;