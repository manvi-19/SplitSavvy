import { useState } from 'react';
import styles from './BalanceSheet.module.css';
import { calculateBalances } from '../utils/balanceCalculator';

export default function BalanceSheet({ members, expenses }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const balances = calculateBalances(members, expenses);
  
  // Helper to get avatars by person name
  const getInitial = (name) => name.charAt(0).toUpperCase();
  
  const getColorForPerson = (name) => {
    const COLORS = [
      '#12b886', '#15aabf', '#228be6', '#7950f2', 
      '#fa5252', '#fd7e14', '#fab005', '#40c057'
    ];
    const index = name.charCodeAt(0) % COLORS.length;
    return COLORS[index];
  };

  return (
    <div className={styles.sheetContainer}>
      <div 
        className={styles.header} 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.headerTitle}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path d="M16 6l2.3 2.3M2 12h5M2 12l5 5M2 12l5-5M22 12h-5M22 12l-5 5M22 12l-5-5M12 2v5M12 2l5 5M12 2L7 7M12 22v-5M12 22l5-5M12 22l-5-5" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2>Balance Sheet</h2>
        </div>
        
        <button 
          className={styles.expandButton}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}
          >
            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      
      {isExpanded && (
        <div className={styles.content}>
          {balances.length === 0 ? (
            expenses.length > 0 ? (
              <div className={styles.settledState}>
                <div className={styles.settledIcon}>🎉</div>
                <h3 className={styles.settledTitle}>All Settled Up!</h3>
                <p className={styles.settledText}>Everyone has paid their fair share</p>
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>Add expenses to see who owes what</p>
              </div>
            )
          ) : (
            <ul className={styles.balanceList}>
              {balances.map((entry, index) => (
                <li key={index} className={styles.balanceItem}>
                  <div className={styles.balancePeople}>
                    <div 
                      className={styles.personAvatar}
                      style={{ backgroundColor: getColorForPerson(entry.from) }}
                    >
                      {getInitial(entry.from)}
                    </div>
                    <div className={styles.owesIndicator}>
                      <svg viewBox="0 0 24 24" className={styles.arrowIcon}>
                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div 
                      className={styles.personAvatar}
                      style={{ backgroundColor: getColorForPerson(entry.to) }}
                    >
                      {getInitial(entry.to)}
                    </div>
                  </div>
                  
                  <div className={styles.balanceDetails}>
                    <div className={styles.balanceText}>
                      <span className={styles.fromPerson}>{entry.from}</span> owes 
                      <span className={styles.toPerson}> {entry.to}</span>
                    </div>
                    <div className={styles.balanceAmount}>
                      ₹{entry.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}