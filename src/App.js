import React, { useState } from 'react';
import './App.css';

function App() {
  // State for income and tax calculation
  const [income, setIncome] = useState('');
  const [taxDetails, setTaxDetails] = useState('');
  const [totalTax, setTotalTax] = useState('');

  // Tax calculation function
  const calculateTax = () => {
    let netIncome = income - 75000; // Standard Deduction
    let tax = 0;
    let taxBreakdown = [];

    if (netIncome <= 1200000) {
      setTaxDetails('No Tax due to Rebate (Income below ₹12,00,000)');
      setTotalTax(0);
      return;
    }

    // Tax slabs calculation
    if (netIncome > 400000) {
      let slab1 = Math.min(netIncome - 400000, 400000);
      tax += slab1 * 0.05;
      taxBreakdown.push(`₹${slab1} @ 5% = ₹${slab1 * 0.05}`);
    }

    if (netIncome > 800000) {
      let slab2 = Math.min(netIncome - 800000, 400000);
      tax += slab2 * 0.10;
      taxBreakdown.push(`₹${slab2} @ 10% = ₹${slab2 * 0.10}`);
    }

    if (netIncome > 1200000) {
      let slab3 = Math.min(netIncome - 1200000, 400000);
      tax += slab3 * 0.15;
      taxBreakdown.push(`₹${slab3} @ 15% = ₹${slab3 * 0.15}`);
    }

    if (netIncome > 1600000) {
      let slab4 = Math.min(netIncome - 1600000, 400000);
      tax += slab4 * 0.20;
      taxBreakdown.push(`₹${slab4} @ 20% = ₹${slab4 * 0.20}`);
    }

    if (netIncome > 2000000) {
      let slab5 = netIncome - 2000000;
      tax += slab5 * 0.25;
      taxBreakdown.push(`₹${slab5} @ 25% = ₹${slab5 * 0.25}`);
    }

    // Health and Education Cess
    let cess = tax * 0.04;
    tax += cess;
    taxBreakdown.push(`Cess (4%) = ₹${cess.toFixed(2)}`);

    setTaxDetails(taxBreakdown.join(', '));
    setTotalTax(tax.toFixed(2));
  };

  return (
    <div className="App">
      <h1>Tax Calculator - Under New Tax Regime (Effective: 1 Feb 2025)</h1>
      <input
        type="number"
        placeholder="Enter Total Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
      <button onClick={calculateTax}>Calculate Tax</button>
      <div>
        {taxDetails && <p><strong>Tax Calculation: </strong>{taxDetails}</p>}
        {totalTax && <p><strong>Total Tax Payable: </strong>₹{totalTax}</p>}
      </div>
    </div>
  );
}

export default App;
