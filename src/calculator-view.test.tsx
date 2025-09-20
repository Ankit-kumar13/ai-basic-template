import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Calculator } from './Calculator-View';

describe('Calculator Component', () => {
  it('renders calculator with initial display', () => {
    render(<Calculator />);
    expect(screen.getByRole('textbox')).toHaveTextContent('0');
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  it('renders all number buttons', () => {
    render(<Calculator />);
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByLabelText(i.toString())).toBeInTheDocument();
    }
  });

  it('renders operation buttons', () => {
    render(<Calculator />);
    expect(screen.getByLabelText('Add')).toBeInTheDocument();
    expect(screen.getByLabelText('Subtract')).toBeInTheDocument();
    expect(screen.getByLabelText('Multiply')).toBeInTheDocument();
    expect(screen.getByLabelText('Divide')).toBeInTheDocument();
    expect(screen.getByLabelText('Equals')).toBeInTheDocument();
  });

  it('renders clear buttons', () => {
    render(<Calculator />);
    expect(screen.getByLabelText('Clear all')).toBeInTheDocument();
    expect(screen.getByLabelText('Clear entry')).toBeInTheDocument();
    expect(screen.getByLabelText('Delete last character')).toBeInTheDocument();
  });

  it('renders additional operation buttons', () => {
    render(<Calculator />);
    expect(screen.getByLabelText('Percentage')).toBeInTheDocument();
    expect(screen.getByLabelText('Square')).toBeInTheDocument();
    expect(screen.getByLabelText('Square root')).toBeInTheDocument();
    expect(screen.getByLabelText('Power')).toBeInTheDocument();
    expect(screen.getByLabelText('Factorial')).toBeInTheDocument();
  });

  it('handles number input', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    expect(screen.getByRole('textbox')).toHaveTextContent('5');
    
    await user.click(screen.getByLabelText('3'));
    expect(screen.getByRole('textbox')).toHaveTextContent('53');
  });

  it('handles decimal input', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Decimal point'));
    await user.click(screen.getByLabelText('3'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('5.3');
  });

  it('handles basic arithmetic operations', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    // 5 + 3 = 8
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Add'));
    await user.click(screen.getByLabelText('3'));
    await user.click(screen.getByLabelText('Equals'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('8');
  });

  it('handles multiplication', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    // 4 * 3 = 12
    await user.click(screen.getByLabelText('4'));
    await user.click(screen.getByLabelText('Multiply'));
    await user.click(screen.getByLabelText('3'));
    await user.click(screen.getByLabelText('Equals'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('12');
  });

  it('handles division', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    // 15 / 3 = 5
    await user.click(screen.getByLabelText('1'));
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Divide'));
    await user.click(screen.getByLabelText('3'));
    await user.click(screen.getByLabelText('Equals'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('5');
  });

  it('handles subtraction', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    // 10 - 3 = 7
    await user.click(screen.getByLabelText('1'));
    await user.click(screen.getByLabelText('0'));
    await user.click(screen.getByLabelText('Subtract'));
    await user.click(screen.getByLabelText('3'));
    await user.click(screen.getByLabelText('Equals'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('7');
  });

  it('handles clear all', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('3'));
    await user.click(screen.getByLabelText('Clear all'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('0');
  });

  it('handles clear entry', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Add'));
    await user.click(screen.getByLabelText('3'));
    await user.click(screen.getByLabelText('Clear entry'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('0');
  });

  it('handles delete', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('3'));
    await user.click(screen.getByLabelText('Delete last character'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('5');
  });

  it('handles percentage', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('0'));
    await user.click(screen.getByLabelText('Percentage'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('0.5');
  });

  it('handles square', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('4'));
    await user.click(screen.getByLabelText('Square'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('16');
  });

  it('handles square root', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('1'));
    await user.click(screen.getByLabelText('6'));
    await user.click(screen.getByLabelText('Square root'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('4');
  });

  it('handles factorial', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Factorial'));
    
    expect(screen.getByRole('textbox')).toHaveTextContent('120');
  });

  it('handles division by zero error', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Divide'));
    await user.click(screen.getByLabelText('0'));
    await user.click(screen.getByLabelText('Equals'));
    
    expect(screen.getByText('Division by zero')).toBeInTheDocument();
  });

  it('handles square root of negative number error', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Subtract'));
    await user.click(screen.getByLabelText('1'));
    await user.click(screen.getByLabelText('0'));
    await user.click(screen.getByLabelText('Square root'));
    
    expect(screen.getByText('Square root of negative number')).toBeInTheDocument();
  });

  it('handles keyboard input', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.keyboard('5+3=');
    
    expect(screen.getByRole('textbox')).toHaveTextContent('8');
  });

  it('handles keyboard clear', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.keyboard('53');
    await user.keyboard('{Escape}');
    
    expect(screen.getByRole('textbox')).toHaveTextContent('0');
  });

  it('handles keyboard delete', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.keyboard('53');
    await user.keyboard('{Backspace}');
    
    expect(screen.getByRole('textbox')).toHaveTextContent('5');
  });

  it('handles keyboard decimal', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.keyboard('5.3');
    
    expect(screen.getByRole('textbox')).toHaveTextContent('5.3');
  });

  it('applies light theme by default', () => {
    render(<Calculator />);
    const container = screen.getByRole('application');
    expect(container).toHaveClass('bg-gray-100');
  });

  it('applies dark theme when specified', () => {
    render(<Calculator theme="dark" />);
    const container = screen.getByRole('application');
    expect(container).toHaveClass('bg-gray-900');
  });

  it('calls onThemeChange when theme toggle is clicked', async () => {
    const onThemeChange = vi.fn();
    const user = userEvent.setup();
    render(<Calculator theme="light" onThemeChange={onThemeChange} />);
    
    await user.click(screen.getByLabelText('Switch to dark theme'));
    
    expect(onThemeChange).toHaveBeenCalledWith('dark');
  });

  it('shows correct theme toggle icon', () => {
    const { rerender } = render(<Calculator theme="light" />);
    expect(screen.getByText('🌙')).toBeInTheDocument();
    
    rerender(<Calculator theme="dark" />);
    expect(screen.getByText('☀️')).toBeInTheDocument();
  });

  it('shows keyboard shortcuts info', () => {
    render(<Calculator />);
    expect(screen.getByText(/Keyboard shortcuts/)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Calculator />);
    
    expect(screen.getByRole('application')).toHaveAttribute('aria-label', 'Calculator');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Calculator display');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-atomic', 'true');
  });

  it('shows error message with proper role', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Divide'));
    await user.click(screen.getByLabelText('0'));
    await user.click(screen.getByLabelText('Equals'));
    
    const errorMessage = screen.getByText('Division by zero');
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  it('clears error when new input is entered', async () => {
    const user = userEvent.setup();
    render(<Calculator />);
    
    // Create an error
    await user.click(screen.getByLabelText('5'));
    await user.click(screen.getByLabelText('Divide'));
    await user.click(screen.getByLabelText('0'));
    await user.click(screen.getByLabelText('Equals'));
    
    expect(screen.getByText('Division by zero')).toBeInTheDocument();
    
    // Clear error with new input
    await user.click(screen.getByLabelText('5'));
    
    expect(screen.queryByText('Division by zero')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveTextContent('5');
  });
});
