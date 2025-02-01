import React, { useState } from 'react';
import './App.css';

function App() {
  const [income, setIncome] = useState('');
  const [taxDetails, setTaxDetails] = useState([]);
  const [totalTax, setTotalTax] = useState('');
  const [afterDeduction, setAfterDeduction] = useState('');

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  const calculateTax = () => {
    let netIncome = income - 75000;
    let tax = 0;
    let taxBreakdown = [];

    taxBreakdown.push({
      description: "Standard Deduction (₹75,000)",
      amount: formatCurrency(75000),
      taxAmount: "-"
    });

    let taxableIncome = netIncome;

    taxBreakdown.push({
      description: "Salary After Standard Deduction",
      amount: formatCurrency(taxableIncome),
      taxAmount: "-"
    });

    if (netIncome <= 1200000) {
      setTaxDetails([{ description: "Income Below ₹12,00,000", amount: "₹0", taxAmount: "₹0" }]);
      setTotalTax("₹0");
      setAfterDeduction(formatCurrency(taxableIncome));
      return;
    }

    const slabs = [
      { limit: 400000, rate: 0.05, label: "₹4,00,001 - ₹8,00,000" },
      { limit: 400000, rate: 0.10, label: "₹8,00,001 - ₹12,00,000" },
      { limit: 400000, rate: 0.15, label: "₹12,00,001 - ₹16,00,000" },
      { limit: 400000, rate: 0.20, label: "₹16,00,001 - ₹20,00,000" },
      { limit: Infinity, rate: 0.25, label: "₹20,00,001 and above" }
    ];

    let remainingIncome = netIncome - 400000;

    slabs.forEach((slab) => {
      if (remainingIncome > 0) {
        let slabIncome = Math.min(remainingIncome, slab.limit);
        tax += slabIncome * slab.rate;
        taxBreakdown.push({
          description: slab.label,
          amount: formatCurrency(slabIncome),
          taxAmount: formatCurrency(slabIncome * slab.rate)
        });
        remainingIncome -= slabIncome;
      }
    });

    let cess = tax * 0.04;
    tax += cess;
    taxBreakdown.push({
      description: "Cess (4%)",
      amount: "",
      taxAmount: formatCurrency(cess)
    });

    setTaxDetails(taxBreakdown);
    setTotalTax(formatCurrency(tax));
    setAfterDeduction(formatCurrency(taxableIncome));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      calculateTax();
    }
  };

  return (
    <div className="App">
      <h1>Income Tax Calculator - Under New Tax Regime (Updated: 1 Feb 2025)</h1>
      <input
        type="number"
        placeholder="Enter Total Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={calculateTax}>Calculate Tax</button>

      <div className="tax-table">
        {taxDetails.length > 0 && (
          <>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Tax Amount</th>
                </tr>
              </thead>
              <tbody>
                {taxDetails.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.description}</td>
                    <td>{detail.amount}</td>
                    <td>{detail.taxAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-tax">
              <strong>Total Tax Payable:</strong> <span>{totalTax}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
