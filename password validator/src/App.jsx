import React, { useState, useMemo } from 'react';
import CheckIcon from './components/CheckIcon';
import StrengthMeter from './components/StrengthMeter';
import './App.css';

export default function App() {
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Copy');

  const passwordStrength = useMemo(() => {
    let score = 0;

    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[^A-Za-z0-9]/.test(password),
    };

    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.specialChar) score++;
    if (password.length >= 12) score++;

    let level = 'Very Weak';
    let color = '#ef4444';
    let width = '20%';

    switch (score) {
        case 1: level = 'Very Weak'; color = '#ef4444'; width = '20%'; break;
        case 2: level = 'Weak'; color = '#f97316'; width = '40%'; break;
        case 3: level = 'Good'; color = '#facc15'; width = '60%'; break;
        case 4: case 5: level = 'Strong'; color = '#4ade80'; width = '80%'; break;
        case 6: level = 'Excellent'; color = '#22c55e'; width = '100%'; break;
        default: level = 'Very Weak'; color = '#ef4444'; width = '0%';
    }
    
    if (password.length === 0) {
        level = '';
        width = '0%';
    }

    return { level, color, width, checks };
  }, [password]);

  const generateStrongPassword = () => {
    const charSets = {
      lower: 'abcdefghijklmnopqrstuvwxyz',
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      special: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    let allChars = Object.values(charSets).join('');
    let newPassword = '';
    newPassword += charSets.lower[Math.floor(Math.random() * charSets.lower.length)];
    newPassword += charSets.upper[Math.floor(Math.random() * charSets.upper.length)];
    newPassword += charSets.numbers[Math.floor(Math.random() * charSets.numbers.length)];
    newPassword += charSets.special[Math.floor(Math.random() * charSets.special.length)];
    for (let i = 4; i < 16; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }
    const shuffledPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    setPassword(shuffledPassword);
    setCopyButtonText('Copy');
  };

  const handleCopy = () => {
    if (password) {
      const textArea = document.createElement('textarea');
      textArea.value = password;
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          setCopyButtonText('Copied!');
          setTimeout(() => setCopyButtonText('Copy'), 2000);
        }
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-md mx-auto p-4">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10">
          <div className="text-center mb-2">
             <h1 className="text-3xl font-bold text-white">Password Validator</h1>
          </div>
          <p className="text-gray-400 text-center mb-6">Enter a password to check its strength.</p>
          
          <div className="relative mb-2">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-700 text-white placeholder-gray-500 rounded-lg pl-4 pr-28 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                {password && (
                    <button onClick={handleCopy} className="px-3 text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                        {copyButtonText}
                    </button>
                )}
                <button onClick={() => setShowPassword(!showPassword)} className="px-3 text-sm font-semibold text-gray-400 hover:text-white">
                    {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>
          </div>
          
          <div className="text-center my-4">
            <p className="text-sm text-gray-400">
              Need a strong password?{' '}
              <button onClick={generateStrongPassword} className="font-semibold text-indigo-400 hover:text-indigo-300 hover:underline focus:outline-none bg-transparent border-none">
                  Generate one
              </button>
            </p>
          </div>

          <StrengthMeter strength={passwordStrength} />

          <div className="mt-6 space-y-2">
            <div className="flex items-center">
              <CheckIcon checked={passwordStrength.checks.length} />
              <span className={passwordStrength.checks.length ? 'text-gray-300' : 'text-gray-500'}>At least 8 characters long</span>
            </div>
            <div className="flex items-center">
              <CheckIcon checked={passwordStrength.checks.uppercase} />
              <span className={passwordStrength.checks.uppercase ? 'text-gray-300' : 'text-gray-500'}>Contains an uppercase letter</span>
            </div>
             <div className="flex items-center">
              <CheckIcon checked={passwordStrength.checks.lowercase} />
              <span className={passwordStrength.checks.lowercase ? 'text-gray-300' : 'text-gray-500'}>Contains a lowercase letter</span>
            </div>
            <div className="flex items-center">
              <CheckIcon checked={passwordStrength.checks.number} />
              <span className={passwordStrength.checks.number ? 'text-gray-300' : 'text-gray-500'}>Contains a number</span>
            </div>
            <div className="flex items-center">
              <CheckIcon checked={passwordStrength.checks.specialChar} />
              <span className={passwordStrength.checks.specialChar ? 'text-gray-300' : 'text-gray-500'}>Contains a special character (!@#...)</span>
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-8 text-sm">Built by Harsh</p>
      </div>
    </div>
  );
}