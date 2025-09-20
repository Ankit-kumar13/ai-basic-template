import React, { useReducer, useEffect, useCallback } from 'react';
import {
  calculatorReducer,
  initialCalculatorState,
  type CalculatorState,
  type CalculatorAction,
} from './calculator';

interface CalculatorProps {
  theme?: 'light' | 'dark';
  onThemeChange?: (theme: 'light' | 'dark') => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ 
  theme = 'light', 
  onThemeChange 
}) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialCalculatorState);

  // Handle keyboard input
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    
    // Prevent default for calculator keys
    if (/[0-9+\-*/.=]/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
      event.preventDefault();
    }

    if (/[0-9]/.test(key)) {
      dispatch({ type: 'INPUT_NUMBER', payload: key });
    } else if (key === '.') {
      dispatch({ type: 'INPUT_DECIMAL' });
    } else if (key === '+') {
      dispatch({ type: 'SET_OPERATION', payload: 'add' });
    } else if (key === '-') {
      dispatch({ type: 'SET_OPERATION', payload: 'subtract' });
    } else if (key === '*') {
      dispatch({ type: 'SET_OPERATION', payload: 'multiply' });
    } else if (key === '/') {
      dispatch({ type: 'SET_OPERATION', payload: 'divide' });
    } else if (key === '%') {
      dispatch({ type: 'SET_OPERATION', payload: 'percentage' });
    } else if (key === '=' || key === 'Enter') {
      dispatch({ type: 'CALCULATE' });
    } else if (key === 'Escape') {
      dispatch({ type: 'CLEAR' });
    } else if (key === 'Backspace') {
      dispatch({ type: 'DELETE' });
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const buttonClasses = `h-12 w-full rounded-lg font-medium text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'dark'
      ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500'
      : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400'
  }`;

  const operatorButtonClasses = `h-12 w-full rounded-lg font-medium text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'dark'
      ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
      : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400'
  }`;

  const equalsButtonClasses = `h-12 w-full rounded-lg font-medium text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'dark'
      ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
      : 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-400'
  }`;

  const clearButtonClasses = `h-12 w-full rounded-lg font-medium text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'dark'
      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
      : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
  }`;

  const displayClasses = `w-full p-4 text-right text-3xl font-mono rounded-lg border-2 transition-colors duration-200 ${
    theme === 'dark'
      ? 'bg-gray-800 text-white border-gray-600'
      : 'bg-white text-gray-900 border-gray-300'
  } ${state.error ? 'border-red-500' : ''}`;

  const containerClasses = `max-w-sm mx-auto p-6 rounded-2xl shadow-2xl transition-colors duration-200 ${
    theme === 'dark'
      ? 'bg-gray-900 border border-gray-700'
      : 'bg-gray-100 border border-gray-200'
  }`;

  return (
    <div className={containerClasses} role="application" aria-label="Calculator">
      {/* Header with theme toggle */}
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          Calculator
        </h2>
        <button
          onClick={() => onThemeChange?.(theme === 'light' ? 'dark' : 'light')}
          className={`p-2 rounded-lg transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Display */}
      <div className="mb-4">
        <div
          className={displayClasses}
          role="textbox"
          aria-label="Calculator display"
          aria-live="polite"
          aria-atomic="true"
        >
          {state.error || state.display}
        </div>
        {state.error && (
          <div className="text-red-500 text-sm mt-1" role="alert">
            {state.error}
          </div>
        )}
      </div>

      {/* Button Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button
          className={clearButtonClasses}
          onClick={() => dispatch({ type: 'CLEAR' })}
          aria-label="Clear all"
        >
          C
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'CLEAR_ENTRY' })}
          aria-label="Clear entry"
        >
          CE
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'DELETE' })}
          aria-label="Delete last character"
        >
          ⌫
        </button>
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'divide' })}
          aria-label="Divide"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '7' })}
          aria-label="Seven"
        >
          7
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '8' })}
          aria-label="Eight"
        >
          8
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '9' })}
          aria-label="Nine"
        >
          9
        </button>
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'multiply' })}
          aria-label="Multiply"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '4' })}
          aria-label="Four"
        >
          4
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '5' })}
          aria-label="Five"
        >
          5
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '6' })}
          aria-label="Six"
        >
          6
        </button>
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'subtract' })}
          aria-label="Subtract"
        >
          −
        </button>

        {/* Row 4 */}
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '1' })}
          aria-label="One"
        >
          1
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '2' })}
          aria-label="Two"
        >
          2
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '3' })}
          aria-label="Three"
        >
          3
        </button>
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'add' })}
          aria-label="Add"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'percentage' })}
          aria-label="Percentage"
        >
          %
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_NUMBER', payload: '0' })}
          aria-label="Zero"
        >
          0
        </button>
        <button
          className={buttonClasses}
          onClick={() => dispatch({ type: 'INPUT_DECIMAL' })}
          aria-label="Decimal point"
        >
          .
        </button>
        <button
          className={equalsButtonClasses}
          onClick={() => dispatch({ type: 'CALCULATE' })}
          aria-label="Equals"
        >
          =
        </button>
      </div>

      {/* Additional operations row */}
      <div className="grid grid-cols-4 gap-3 mt-3">
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'square' })}
          aria-label="Square"
        >
          x²
        </button>
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'squareRoot' })}
          aria-label="Square root"
        >
          √
        </button>
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'power' })}
          aria-label="Power"
        >
          x^y
        </button>
        <button
          className={operatorButtonClasses}
          onClick={() => dispatch({ type: 'SET_OPERATION', payload: 'factorial' })}
          aria-label="Factorial"
        >
          x!
        </button>
      </div>

      {/* Keyboard shortcuts info */}
      <div className={`mt-4 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>Keyboard shortcuts: Numbers, +, -, *, /, =, Enter, Escape (clear), Backspace (delete)</p>
      </div>
    </div>
  );
};
