import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Header from './components/Header';
import GroupSetup from './components/GroupSetup';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BalanceSheet from './components/BalanceSheet';

export default function App() {
  const [members, setMembers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [theme, setTheme] = useState('light');
  const [showConfetti, setShowConfetti] = useState(false);

  // Theme toggler function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Apply theme to document body
  useEffect(() => {
    document.body.className = theme === 'dark' ? styles.darkMode : '';
  }, [theme]);

  // Show confetti animation when a new expense is added
  useEffect(() => {
    if (expenses.length > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [expenses.length]);

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.darkContainer : ''}`}>
      {showConfetti && <div className={styles.confetti}></div>}
      <div className={styles.backgroundDecoration}></div>
      <div className={styles.contentWrapper}>
        <Header toggleTheme={toggleTheme} currentTheme={theme} />
        <main className={styles.main}>
          <GroupSetup members={members} setMembers={setMembers} />
          {members.length > 1 && (
            <div className={styles.expenseSection}>
              <ExpenseForm members={members} setExpenses={setExpenses} />
              <div className={styles.summarySection}>
                <ExpenseList expenses={expenses} />
                <BalanceSheet members={members} expenses={expenses} />
              </div>
            </div>
          )}
        </main>
        <footer className={styles.footer}>
          <p>SplitSavvy © {new Date().getFullYear()} | Smart Expense Splitting for Shared Living</p>
        </footer>
      </div>
    </div>
  );
}