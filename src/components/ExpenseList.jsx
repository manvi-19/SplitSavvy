import { useState } from 'react';
import styles from './ExpenseList.module.css';

export default function ExpenseList({ expenses }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get total of all expenses
  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  return (
    <div className={styles.listContainer}>
      <div 
        className={styles.header} 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.headerTitle}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 14h6M9 18h6M9 10h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2>Expenses</h2>
        </div>
        
        {expenses.length > 0 && (
          <div className={styles.totalAmount}>
            ₹{totalAmount.toFixed(2)}
          </div>
        )}
        
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
          {expenses.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📝</div>
              <p>No expenses yet</p>
              <p className={styles.emptySubtext}>Add your first expense to get started</p>
            </div>
          ) : (
            <ul className={styles.expenseList}>
              {expenses.map((expense) => (
                <li key={expense.id || `${expense.payer}-${expense.desc}-${expense.amount}`} className={styles.expenseItem}>
                  <div className={styles.expenseIcon}>
                    {expense.icon || '📝'}
                  </div>
                  <div className={styles.expenseDetails}>
                    <div className={styles.expenseTop}>
                      <h3 className={styles.expenseDesc}>{expense.desc}</h3>
                      <span className={styles.expenseAmount}>₹{expense.amount.toFixed(2)}</span>
                    </div>
                    <div className={styles.expenseBottom}>
                      <span className={styles.expensePayer}>
                        <span className={styles.payerLabel}>Paid by</span> {expense.payer}
                      </span>
                      {expense.date && (
                        <span className={styles.expenseDate}>{formatDate(expense.date)}</span>
                      )}
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