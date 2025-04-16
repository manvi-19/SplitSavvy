import { useState, useRef, useEffect } from 'react';
import styles from './MemberForm.module.css';

export default function MemberForm({ onAdd }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  
  useEffect(() => {
    // Focus the input on initial render
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Please enter a name');
      return;
    }
    
    const success = onAdd(trimmedName);
    
    if (success) {
      setName('');
      setError('');
      // Focus the input again after successful submission
      inputRef.current?.focus();
    } else {
      setError('This name already exists');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          ref={inputRef}
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          className={error ? styles.inputError : ''}
        />
        <button 
          type="submit"
          className={styles.addButton}
          disabled={!name.trim()}
        >
          Add
        </button>
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}