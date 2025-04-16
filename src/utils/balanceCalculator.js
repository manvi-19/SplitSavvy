/**
 * Enhanced balance calculator for SplitSavvy app
 * Calculates who owes what to whom based on expenses
 */

export function calculateBalances(members, expenses) {
  // Skip calculation if there are no expenses or not enough members
  if (expenses.length === 0 || members.length <= 1) {
    return [];
  }

  // Initialize data structures
  const totals = {}; // How much each person paid in total
  const share = {}; // How much each person should have paid
  const balances = []; // Final balance sheet

  // Initialize totals and shares with zero values
  members.forEach(({ name }) => {
    totals[name] = 0;
    share[name] = 0;
  });

  // Calculate total spent by each person and the equal share for everyone
  for (const { payer, amount } of expenses) {
    // Add to total paid by this person
    totals[payer] += amount;
    
    // Calculate per-person share of this expense
    const split = amount / members.length;
    
    // Add this split to each member's share
    members.forEach(({ name }) => {
      share[name] += split;
    });
  }

  // Calculate net balance (positive means they paid more than their share)
  const net = {};
  members.forEach(({ name }) => {
    net[name] = totals[name] - share[name];
  });

  // Separate into creditors (paid more) and debtors (paid less)
  const creditors = Object.entries(net)
    .filter(([_, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]); // Sort by amount (descending)
    
  const debtors = Object.entries(net)
    .filter(([_, v]) => v < 0)
    .sort((a, b) => a[1] - b[1]); // Sort by amount (ascending)

  // Settle the debts
  let i = 0, j = 0;

  // Keep going until we've processed all debtors or creditors
  while (i < debtors.length && j < creditors.length) {
    const [debtor, owed] = debtors[i];
    const [creditor, due] = creditors[j];

    // Calculate how much of the debt we can settle in this iteration
    const amount = Math.min(-owed, due);
    
    // Only create a balance entry if the amount is significant (avoid tiny transactions)
    if (amount > 0.01) {
      balances.push({ 
        from: debtor, 
        to: creditor, 
        amount: amount.toFixed(2) 
      });
      
      // Update the remaining balances
      net[debtor] += amount;
      net[creditor] -= amount;
    }

    // If debtor has paid their debt, move to next debtor
    if (Math.abs(net[debtor]) < 0.01) i++;
    
    // If creditor has received all their due, move to next creditor
    if (Math.abs(net[creditor]) < 0.01) j++;
  }

  return balances;
}