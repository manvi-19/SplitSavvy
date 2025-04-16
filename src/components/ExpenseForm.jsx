import { useState, useEffect } from 'react';
import styles from './ExpenseForm.module.css';

// Expense categories with icons
const CATEGORIES = [
  { id: 'food', name: 'Food & Drinks', icon: '🍔' },
  { id: 'transport', name: 'Transportation', icon: '🚗' },
  { id: 'utilities', name: 'Utilities', icon: '💡' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'shopping', name: 'Shopping', icon: '🛍' },
  { id: 'rent', name: 'Rent', icon: '🏠' },
  { id: 'other', name: 'Other', icon: '📝' }
];

export default function ExpenseForm({ members, setExpenses }) {
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [showCategories, setShowCategories] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Auto-select the first category if none is selected
    if (CATEGORIES.length > 0 && !category) {
      setCategory(CATEGORIES[0].id);
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    
    if (!desc.trim()) newErrors.desc = 'Description is required';
    if (!amount) newErrors.amount = 'Amount is required';
    else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }
    if (!payer) newErrors.payer = 'Select who paid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Get the category object
    const selectedCategory = CATEGORIES.find(c => c.id === category) || CATEGORIES[0];
    
    setTimeout(() => {
      setExpenses((prev) => [
        ...prev,
        {
          payer,
          amount: parseFloat(amount),
          desc,
          category: selectedCategory.id,
          categoryName: selectedCategory.name,
          icon: selectedCategory.icon,
          date: new Date().toISOString(),
          id: Date.now()
        },
      ]);
  
      // Reset form
      setAmount('');
      setDesc('');
      setPayer('');
      setIsSubmitting(false);
    }, 500); // Small delay to show loading animation
  };

  const handleCategorySelect = (catId) => {
    setCategory(catId);
    setShowCategories(false);
  };

  const getCategoryById = (catId) => {
    return CATEGORIES.find(cat => cat.id === catId) || CATEGORIES[0];
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <div className={styles.iconWrapper}>
          <svg viewBox="0 0 24 24" className={styles.formIcon}>
            <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h2>Add Expense</h2>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            value={desc}
            placeholder="What was this expense for?"
            onChange={(e) => {
              setDesc(e.target.value);
              if (errors.desc) setErrors({...errors, desc: ''});
            }}
            className={errors.desc ? styles.inputError : ''}
          />
          {errors.desc && <p className={styles.errorMessage}>{errors.desc}</p>}
        </div>
        
        <div className={styles.rowInputs}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Amount</label>
            <div className={styles.amountWrapper}>
              <span className={styles.currencySymbol}>₹</span>
              <input
                type="number"
                value={amount}
                placeholder="0.00"
                step="0.01"
                min="0"
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors({...errors, amount: ''});
                }}
                className={`${styles.amountInput} ${errors.amount ? styles.inputError : ''}`}
              />
            </div>
            {errors.amount && <p className={styles.errorMessage}>{errors.amount}</p>}
          </div>
          
          <div className={styles.inputGroup}>
            <label className={styles.label}>Category</label>
            <div className={styles.categorySelector}>
              <button 
                type="button"
                className={styles.categoryButton}
                onClick={() => setShowCategories(!showCategories)}
              >
                <span className={styles.categoryIcon}>
                  {getCategoryById(category).icon}
                </span>
                <span className={styles.categoryName}>
                  {getCategoryById(category).name}
                </span>
                <svg viewBox="0 0 24 24" className={styles.dropdownIcon}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              
              {showCategories && (
                <div className={styles.categoryDropdown}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      className={`${styles.categoryOption} ${cat.id === category ? styles.selectedCategory : ''}`}
                      onClick={() => handleCategorySelect(cat.id)}
                    >
                      <span className={styles.categoryIcon}>{cat.icon}</span>
                      <span className={styles.categoryName}>{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>Paid by</label>
          <select 
            value={payer} 
            onChange={(e) => {
              setPayer(e.target.value);
              if (errors.payer) setErrors({...errors, payer: ''});
            }}
            className={errors.payer ? styles.inputError : ''}
          >
            <option value="">Who paid for this?</option>
            {members.map((m) => (
              <option key={m.id || m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
          {errors.payer && <p className={styles.errorMessage}>{errors.payer}</p>}
        </div>
        
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className={styles.spinner}></span>
          ) : (
            'Add Expense'
          )}
        </button>
      </form>
    </div>
  );
}