import { useState } from 'react';
import styles from './MemberList.module.css';

const COLORS = [
  '#12b886', '#15aabf', '#228be6', '#7950f2', 
  '#fa5252', '#fd7e14', '#fab005', '#40c057'
];

export default function MemberList({ members, onRemove }) {
  // Assigning random but consistent colors to members
  const getInitial = (name) => name.charAt(0).toUpperCase();
  const getColor = (name) => {
    const index = name.charCodeAt(0) % COLORS.length;
    return COLORS[index];
  };
  
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {members.map((member) => (
          <li key={member.id || member.name} className={styles.item}>
            <div 
              className={styles.avatar} 
              style={{ backgroundColor: getColor(member.name) }}
            >
              {getInitial(member.name)}
            </div>
            <span className={styles.name}>{member.name}</span>
            {onRemove && (
              <button 
                className={styles.removeButton}
                onClick={() => onRemove(member.id)}
                aria-label={`Remove ${member.name}`}
              >
                <svg viewBox="0 0 24 24" className={styles.removeIcon}>
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}