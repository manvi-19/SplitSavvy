import { useState } from 'react';
import styles from './GroupSetup.module.css';
import MemberForm from './MemberForm';
import MemberList from './MemberList';

export default function GroupSetup({ members, setMembers }) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const addMember = (name) => {
    if (members.find(m => m.name.toLowerCase() === name.toLowerCase())) {
      return false; // Return false if name already exists
    }
    setMembers([...members, { name, id: Date.now() }]);
    return true;
  };
  
  const removeMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <section className={styles.groupSetup}>
      <div 
        className={styles.header} 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.headerTitle}>
          <div className={styles.iconWrapper}>
            <svg viewBox="0 0 24 24" className={styles.icon}>
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2>Add Members</h2>
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
          <MemberForm onAdd={addMember} />
          <MemberList 
            members={members} 
            onRemove={removeMember}
          />
          
          {members.length === 0 && (
            <div className={styles.emptyState}>
              <p>Add people who are sharing expenses</p>
            </div>
          )}
          
          {members.length > 0 && (
            <div className={styles.groupInfo}>
              <span className={styles.count}>
                {members.length} {members.length === 1 ? 'person' : 'people'} in group
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}