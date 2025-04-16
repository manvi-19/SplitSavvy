import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header({ toggleTheme, currentTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <svg viewBox="0 0 24 24" className={styles.logoIcon}>
            <path d="M12 5V3M12 21v-2M4.22 9.22l1.42-1.42M18.36 16.36l1.42-1.42M3 12h2M19 12h2M9.22 19.78l-1.42-1.42M16.36 4.64l1.42 1.42" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 17a5 5 0 100-10 5 5 0 000 10z" fill="currentColor" />
          </svg>
        </div>
        <div className={styles.titleWrapper}>
          <h1>SplitSavvy</h1>
          <p>Smart Expense Splitter for Shared Living</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button 
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {currentTheme === 'dark' ? (
            <svg viewBox="0 0 24 24" className={styles.themeIcon}>
              <path d="M12 3v1m0 16v1m-9-9H2m20 0h-1M5.6 5.6l.7.7m12.1-.7l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className={styles.themeIcon}>
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}