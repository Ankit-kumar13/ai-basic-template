import { describe, expect, it } from 'vitest';
import {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  percentage,
  square,
  squareRoot,
  power,
  factorial,
  calculatorReducer,
  initialCalculatorState,
  type CalculatorState,
} from './calculator';

describe('Basic Math Operations', () => {
  describe('add', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    it('should add zero', () => {
      expect(add(5, 0)).toBe(5);
    });

    it('should add decimal numbers', () => {
      expect(add(1.5, 2.3)).toBeCloseTo(3.8);
    });
  });

  describe('subtract', () => {
    it('should subtract two positive numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });

    it('should subtract negative numbers', () => {
      expect(subtract(-2, -3)).toBe(1);
    });

    it('should subtract positive and negative numbers', () => {
      expect(subtract(5, -3)).toBe(8);
    });

    it('should subtract zero', () => {
      expect(subtract(5, 0)).toBe(5);
    });

    it('should subtract decimal numbers', () => {
      expect(subtract(3.8, 1.5)).toBeCloseTo(2.3);
    });
  });

  describe('multiply', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-3, -4)).toBe(12);
    });

    it('should multiply positive and negative numbers', () => {
      expect(multiply(3, -4)).toBe(-12);
    });

    it('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('should multiply decimal numbers', () => {
      expect(multiply(1.5, 2.5)).toBeCloseTo(3.75);
    });
  });

  describe('divide', () => {
    it('should divide two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should divide negative numbers', () => {
      expect(divide(-10, -2)).toBe(5);
    });

    it('should divide positive and negative numbers', () => {
      expect(divide(10, -2)).toBe(-5);
    });

    it('should divide decimal numbers', () => {
      expect(divide(7.5, 2.5)).toBeCloseTo(3);
    });

    it('should throw error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero');
    });
  });

  describe('modulo', () => {
    it('should calculate modulo of two positive numbers', () => {
      expect(modulo(10, 3)).toBe(1);
    });

    it('should calculate modulo with negative numbers', () => {
      expect(modulo(-10, 3)).toBe(-1);
    });

    it('should calculate modulo with decimal numbers', () => {
      expect(modulo(10.5, 3)).toBeCloseTo(1.5);
    });

    it('should throw error when modulo by zero', () => {
      expect(() => modulo(10, 0)).toThrow('Modulo by zero');
    });
  });
});

describe('Additional Calculator Operations', () => {
  describe('percentage', () => {
    it('should convert number to percentage', () => {
      expect(percentage(50)).toBe(0.5);
    });

    it('should handle decimal percentages', () => {
      expect(percentage(25.5)).toBeCloseTo(0.255);
    });

    it('should handle zero', () => {
      expect(percentage(0)).toBe(0);
    });
  });

  describe('square', () => {
    it('should square positive numbers', () => {
      expect(square(4)).toBe(16);
    });

    it('should square negative numbers', () => {
      expect(square(-4)).toBe(16);
    });

    it('should square decimal numbers', () => {
      expect(square(2.5)).toBeCloseTo(6.25);
    });

    it('should square zero', () => {
      expect(square(0)).toBe(0);
    });
  });

  describe('squareRoot', () => {
    it('should calculate square root of positive numbers', () => {
      expect(squareRoot(16)).toBe(4);
    });

    it('should calculate square root of decimal numbers', () => {
      expect(squareRoot(6.25)).toBeCloseTo(2.5);
    });

    it('should calculate square root of zero', () => {
      expect(squareRoot(0)).toBe(0);
    });

    it('should throw error for negative numbers', () => {
      expect(() => squareRoot(-4)).toThrow('Square root of negative number');
    });
  });

  describe('power', () => {
    it('should calculate power of positive numbers', () => {
      expect(power(2, 3)).toBe(8);
    });

    it('should calculate power with decimal exponents', () => {
      expect(power(4, 0.5)).toBeCloseTo(2);
    });

    it('should calculate power to zero', () => {
      expect(power(5, 0)).toBe(1);
    });

    it('should calculate power of zero', () => {
      expect(power(0, 5)).toBe(0);
    });
  });

  describe('factorial', () => {
    it('should calculate factorial of positive numbers', () => {
      expect(factorial(5)).toBe(120);
    });

    it('should calculate factorial of zero', () => {
      expect(factorial(0)).toBe(1);
    });

    it('should calculate factorial of one', () => {
      expect(factorial(1)).toBe(1);
    });

    it('should throw error for negative numbers', () => {
      expect(() => factorial(-1)).toThrow('Factorial of negative number');
    });
  });
});

describe('Calculator Reducer', () => {
  describe('INPUT_NUMBER', () => {
    it('should input number when display is 0', () => {
      const state = { ...initialCalculatorState };
      const newState = calculatorReducer(state, { type: 'INPUT_NUMBER', payload: '5' });
      expect(newState.display).toBe('5');
    });

    it('should append number to existing display', () => {
      const state = { ...initialCalculatorState, display: '12' };
      const newState = calculatorReducer(state, { type: 'INPUT_NUMBER', payload: '3' });
      expect(newState.display).toBe('123');
    });

    it('should replace display when waiting for operand', () => {
      const state = { ...initialCalculatorState, waitingForOperand: true };
      const newState = calculatorReducer(state, { type: 'INPUT_NUMBER', payload: '7' });
      expect(newState.display).toBe('7');
      expect(newState.waitingForOperand).toBe(false);
    });

    it('should clear error and input number', () => {
      const state = { ...initialCalculatorState, error: 'Some error' };
      const newState = calculatorReducer(state, { type: 'INPUT_NUMBER', payload: '5' });
      expect(newState.display).toBe('5');
      expect(newState.error).toBe(null);
    });
  });

  describe('INPUT_DECIMAL', () => {
    it('should add decimal to display', () => {
      const state = { ...initialCalculatorState, display: '12' };
      const newState = calculatorReducer(state, { type: 'INPUT_DECIMAL' });
      expect(newState.display).toBe('12.');
    });

    it('should not add decimal if already present', () => {
      const state = { ...initialCalculatorState, display: '12.5' };
      const newState = calculatorReducer(state, { type: 'INPUT_DECIMAL' });
      expect(newState.display).toBe('12.5');
    });

    it('should start with 0. when waiting for operand', () => {
      const state = { ...initialCalculatorState, waitingForOperand: true };
      const newState = calculatorReducer(state, { type: 'INPUT_DECIMAL' });
      expect(newState.display).toBe('0.');
      expect(newState.waitingForOperand).toBe(false);
    });
  });

  describe('SET_OPERATION', () => {
    it('should set operation and previous value', () => {
      const state = { ...initialCalculatorState, display: '5' };
      const newState = calculatorReducer(state, { type: 'SET_OPERATION', payload: 'add' });
      expect(newState.previousValue).toBe(5);
      expect(newState.operation).toBe('add');
      expect(newState.waitingForOperand).toBe(true);
    });

    it('should perform calculation and set new operation', () => {
      const state = {
        ...initialCalculatorState,
        display: '3',
        previousValue: 5,
        operation: 'add' as const,
        waitingForOperand: false,
      };
      const newState = calculatorReducer(state, { type: 'SET_OPERATION', payload: 'multiply' });
      expect(newState.display).toBe('8');
      expect(newState.previousValue).toBe(8);
      expect(newState.operation).toBe('multiply');
    });

    it('should handle calculation errors', () => {
      const state = {
        ...initialCalculatorState,
        display: '0',
        previousValue: 5,
        operation: 'divide' as const,
        waitingForOperand: false,
      };
      const newState = calculatorReducer(state, { type: 'SET_OPERATION', payload: 'add' });
      expect(newState.error).toBe('Division by zero');
    });
  });

  describe('CALCULATE', () => {
    it('should perform calculation and reset state', () => {
      const state = {
        ...initialCalculatorState,
        display: '3',
        previousValue: 5,
        operation: 'add' as const,
      };
      const newState = calculatorReducer(state, { type: 'CALCULATE' });
      expect(newState.display).toBe('8');
      expect(newState.previousValue).toBe(null);
      expect(newState.operation).toBe(null);
      expect(newState.waitingForOperand).toBe(true);
    });

    it('should not calculate if no operation is set', () => {
      const state = { ...initialCalculatorState, display: '5' };
      const newState = calculatorReducer(state, { type: 'CALCULATE' });
      expect(newState).toBe(state);
    });

    it('should handle calculation errors', () => {
      const state = {
        ...initialCalculatorState,
        display: '0',
        previousValue: 5,
        operation: 'divide' as const,
      };
      const newState = calculatorReducer(state, { type: 'CALCULATE' });
      expect(newState.error).toBe('Division by zero');
    });
  });

  describe('CLEAR', () => {
    it('should reset calculator to initial state', () => {
      const state = {
        display: '123',
        previousValue: 5,
        operation: 'add' as const,
        waitingForOperand: true,
        error: 'Some error',
      };
      const newState = calculatorReducer(state, { type: 'CLEAR' });
      expect(newState).toEqual(initialCalculatorState);
    });
  });

  describe('CLEAR_ENTRY', () => {
    it('should clear display and reset waitingForOperand', () => {
      const state = { ...initialCalculatorState, display: '123', waitingForOperand: true };
      const newState = calculatorReducer(state, { type: 'CLEAR_ENTRY' });
      expect(newState.display).toBe('0');
      expect(newState.waitingForOperand).toBe(false);
    });
  });

  describe('DELETE', () => {
    it('should delete last character', () => {
      const state = { ...initialCalculatorState, display: '123' };
      const newState = calculatorReducer(state, { type: 'DELETE' });
      expect(newState.display).toBe('12');
    });

    it('should reset to 0 when only one character', () => {
      const state = { ...initialCalculatorState, display: '5' };
      const newState = calculatorReducer(state, { type: 'DELETE' });
      expect(newState.display).toBe('0');
    });

    it('should clear error and reset display', () => {
      const state = { ...initialCalculatorState, error: 'Some error' };
      const newState = calculatorReducer(state, { type: 'DELETE' });
      expect(newState.display).toBe('0');
      expect(newState.error).toBe(null);
    });
  });

  describe('Error handling', () => {
    it('should set error', () => {
      const state = { ...initialCalculatorState };
      const newState = calculatorReducer(state, { type: 'SET_ERROR', payload: 'Test error' });
      expect(newState.error).toBe('Test error');
    });

    it('should clear error', () => {
      const state = { ...initialCalculatorState, error: 'Test error' };
      const newState = calculatorReducer(state, { type: 'CLEAR_ERROR' });
      expect(newState.error).toBe(null);
    });
  });
});
