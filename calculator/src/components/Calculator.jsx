import React, { useState } from 'react';
import CalculatorButton from "./Button.jsx"

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [expression, setExpression] = useState('');
  const [isResultShown, setIsResultShown] = useState(false);

  const inputDigit = (digit) => {
    if (isResultShown) {
 
      clearCalculator();
      setDisplay(String(digit));
      setExpression(String(digit));
      return;
    }

    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
    setExpression(prev => (prev === '0' && digit !== '.') ? String(digit) : prev + digit);
  };


  const inputDecimal = () => {
    if (isResultShown) {
        clearCalculator();
        setDisplay('0.');
        setExpression('0.');
        return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpression(prev => prev + '.');
    }
  };

  const clearCalculator = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setExpression('');
    setIsResultShown(false);
  };
  
  const handlePercent = () => {
    const currentValue = parseFloat(display);
    if (currentValue === 0) return;
    const result = currentValue / 100;
    setDisplay(String(result));
    setExpression(String(result)); 
  }

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);
    
    if (operator && waitingForSecondOperand) {
        setOperator(nextOperator);
        setExpression(prev => prev.slice(0, -2) + ` ${nextOperator} `);
        return;
    }

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }
    
    setExpression(prev => prev + ` ${nextOperator} `);
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    setIsResultShown(false);
  };


  const performCalculation = () => {
    if (firstOperand === null || operator === null) return parseFloat(display);

    const secondOperand = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+':
        result = firstOperand + secondOperand;
        break;
      case '-':
        result = firstOperand - secondOperand;
        break;
      case '*':
        result = firstOperand * secondOperand;
        break;
      case '÷':
        if (secondOperand === 0) return "Error";
        result = firstOperand / secondOperand;
        break;
      default:
        return secondOperand;
    }
    return Math.round(result * 100000000) / 100000000;
  };

  const handleEquals = () => {
      if (operator && !waitingForSecondOperand) {
        const result = performCalculation();
        setDisplay(String(result));
        setExpression(prev => prev + ` = ${result}`);
        setFirstOperand(null); 
        setOperator(null);
        setWaitingForSecondOperand(false);
        setIsResultShown(true);
      }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-slate-800 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-xs mx-auto">

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-4 space-y-2 border border-white/20">
          

          <div className="bg-gray-900/50 rounded-2xl px-5 py-4 flex flex-col justify-end shadow-inner h-28">

            <div className="text-gray-400 text-xl font-light text-right break-all h-7 truncate">
              {expression || ' '} 
            </div>
            <div className="text-white text-5xl font-thin text-right break-all">
              {display}
            </div>
          </div>


          <div className="grid grid-cols-4 gap-3 pt-2">

            <CalculatorButton onClick={clearCalculator} className="bg-slate-500/50 text-slate-100 col-span-2">AC</CalculatorButton>
            <CalculatorButton onClick={handlePercent} className="bg-slate-500/50 text-slate-100">%</CalculatorButton>
            <CalculatorButton onClick={handleOperator} className="bg-orange-500/80 text-white">÷</CalculatorButton>

            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">7</CalculatorButton>
            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">8</CalculatorButton>
            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">9</CalculatorButton>
            <CalculatorButton onClick={handleOperator} className="bg-orange-500/80 text-white">*</CalculatorButton>

            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">4</CalculatorButton>
            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">5</CalculatorButton>
            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">6</CalculatorButton>
            <CalculatorButton onClick={handleOperator} className="bg-orange-500/80 text-white">-</CalculatorButton>

            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">1</CalculatorButton>
            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">2</CalculatorButton>
            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100">3</CalculatorButton>
            <CalculatorButton onClick={handleOperator} className="bg-orange-500/80 text-white">+</CalculatorButton>

            <CalculatorButton onClick={inputDigit} className="bg-slate-700/40 text-slate-100 col-span-2">0</CalculatorButton>
            <CalculatorButton onClick={inputDecimal} className="bg-slate-700/40 text-slate-100">.</CalculatorButton>
            <CalculatorButton onClick={handleEquals} className="bg-orange-600/90 text-white">=</CalculatorButton>
          </div>
        </div>
        <p className="text-center text-slate-400 mt-6 text-sm">React Calculator by Harsh</p>
      </div>
    </div>
  );
}