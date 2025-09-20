// Basic math operations
export const add = (x: number, y: number): number => x + y;
export const subtract = (x: number, y: number): number => x - y;
export const multiply = (x: number, y: number): number => x * y;
export const divide = (x: number, y: number): number => {
  if (y === 0) {
    throw new Error('Division by zero');
  }
  return x / y;
};
export const modulo = (x: number, y: number): number => {
  if (y === 0) {
    throw new Error('Modulo by zero');
  }
  return x % y;
};

// Additional calculator operations
export const percentage = (x: number): number => x / 100;
export const square = (x: number): number => x * x;
export const squareRoot = (x: number): number => {
  if (x < 0) {
    throw new Error('Square root of negative number');
  }
  return Math.sqrt(x);
};
export const power = (x: number, y: number): number => Math.pow(x, y);
export const factorial = (x: number): number => {
  if (x < 0) {
    throw new Error('Factorial of negative number');
  }
  if (x === 0 || x === 1) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i;
  }
  return result;
};

// Calculator state types
export type CalculatorOperation = 
  | 'add' 
  | 'subtract' 
  | 'multiply' 
  | 'divide' 
  | 'modulo' 
  | 'percentage' 
  | 'square' 
  | 'squareRoot' 
  | 'power' 
  | 'factorial';

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: CalculatorOperation | null;
  waitingForOperand: boolean;
  error: string | null;
}

export type CalculatorAction =
  | { type: 'INPUT_NUMBER'; payload: string }
  | { type: 'INPUT_DECIMAL' }
  | { type: 'SET_OPERATION'; payload: CalculatorOperation }
  | { type: 'CALCULATE' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'DELETE' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

// Calculator reducer
export const calculatorReducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case 'INPUT_NUMBER': {
      if (state.error) {
        return { ...state, display: action.payload, error: null, waitingForOperand: false };
      }
      
      if (state.waitingForOperand) {
        return { ...state, display: action.payload, waitingForOperand: false };
      }
      
      if (state.display === '0') {
        return { ...state, display: action.payload };
      }
      
      return { ...state, display: state.display + action.payload };
    }
    
    case 'INPUT_DECIMAL': {
      if (state.error) {
        return { ...state, display: '0.', error: null, waitingForOperand: false };
      }
      
      if (state.waitingForOperand) {
        return { ...state, display: '0.', waitingForOperand: false };
      }
      
      if (state.display.includes('.')) {
        return state;
      }
      
      return { ...state, display: state.display + '.' };
    }
    
    case 'SET_OPERATION': {
      if (state.error) {
        return { ...state, error: null };
      }
      
      const inputValue = parseFloat(state.display);
      
      if (state.previousValue === null) {
        return {
          ...state,
          previousValue: inputValue,
          operation: action.payload,
          waitingForOperand: true,
        };
      }
      
      if (state.operation && !state.waitingForOperand) {
        try {
          const result = performCalculation(state.previousValue, inputValue, state.operation);
          return {
            ...state,
            display: formatNumber(result),
            previousValue: result,
            operation: action.payload,
            waitingForOperand: true,
          };
        } catch (error) {
          return { ...state, error: error instanceof Error ? error.message : 'Calculation error' };
        }
      }
      
      return { ...state, operation: action.payload, waitingForOperand: true };
    }
    
    case 'CALCULATE': {
      if (state.error || !state.operation || state.previousValue === null) {
        return state;
      }
      
      const inputValue = parseFloat(state.display);
      
      try {
        const result = performCalculation(state.previousValue, inputValue, state.operation);
        return {
          ...state,
          display: formatNumber(result),
          previousValue: null,
          operation: null,
          waitingForOperand: true,
        };
      } catch (error) {
        return { ...state, error: error instanceof Error ? error.message : 'Calculation error' };
      }
    }
    
    case 'CLEAR': {
      return {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        error: null,
      };
    }
    
    case 'CLEAR_ENTRY': {
      return { ...state, display: '0', waitingForOperand: false };
    }
    
    case 'DELETE': {
      if (state.error) {
        return { ...state, error: null, display: '0' };
      }
      
      if (state.display.length === 1) {
        return { ...state, display: '0' };
      }
      
      return { ...state, display: state.display.slice(0, -1) };
    }
    
    case 'SET_ERROR': {
      return { ...state, error: action.payload };
    }
    
    case 'CLEAR_ERROR': {
      return { ...state, error: null };
    }
    
    default:
      return state;
  }
};

// Helper function to perform calculations
const performCalculation = (x: number, y: number, operation: CalculatorOperation): number => {
  switch (operation) {
    case 'add':
      return add(x, y);
    case 'subtract':
      return subtract(x, y);
    case 'multiply':
      return multiply(x, y);
    case 'divide':
      return divide(x, y);
    case 'modulo':
      return modulo(x, y);
    case 'percentage':
      return percentage(x);
    case 'square':
      return square(x);
    case 'squareRoot':
      return squareRoot(x);
    case 'power':
      return power(x, y);
    case 'factorial':
      return factorial(x);
    default:
      throw new Error('Unknown operation');
  }
};

// Helper function to format numbers for display
const formatNumber = (num: number): string => {
  if (Number.isInteger(num)) {
    return num.toString();
  }
  
  // Limit decimal places to avoid floating point precision issues
  const rounded = Math.round(num * 100000000) / 100000000;
  return rounded.toString();
};

// Initial calculator state
export const initialCalculatorState: CalculatorState = {
  display: '0',
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  error: null,
};
