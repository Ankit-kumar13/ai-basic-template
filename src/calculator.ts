export const add = (x: number) => (y: number) => x + y;

export const subtract = (x: number) => (y: number) => x - y;

export const multiply = (x: number) => (y: number) => x * y;

export const divide = (x: number) => (y: number) => x / y;

export const modulo = (x: number) => (y: number) => x % y;
type MathAction =
  | { type: 'add'; payload: number }
  | { type: 'subtract'; payload: number }
  | { type: 'multiply'; payload: number }
  | { type: 'divide'; payload: number }
  | { type: 'modulo'; payload: number };

export const mathReducer = (state: number, action: MathAction): number => {
  switch (action.type) {
    case 'add':
      return state + action.payload;
    case 'subtract':
      return state - action.payload;
    case 'multiply':
      return state * action.payload;
    case 'divide':
      return state / action.payload;
    case 'modulo':
      return state % action.payload;
    default:
      return state;
  }
};
