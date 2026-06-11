const { calculate, toNumber, isNumber, modulo, power, squareRoot } = require('../calculator');

describe('Calculator core functions', () => {
  describe('toNumber', () => {
    test('converts numeric strings to numbers', () => {
      expect(toNumber('42')).toBe(42);
      expect(toNumber('3.14')).toBeCloseTo(3.14);
    });

    test('returns null for non-numeric strings', () => {
      expect(toNumber('abc')).toBeNull();
      expect(toNumber('')).toBeNull();
    });
  });

  describe('isNumber', () => {
    test('validates numbers', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(1.5)).toBe(true);
      expect(isNumber(NaN)).toBe(false);
    });
  });

  describe('calculate', () => {
    test('addition: 2 + 3 => 5', () => {
      expect(calculate('add', 2, 3)).toBe(5);
    });

    test('subtraction: 10 - 4 => 6', () => {
      expect(calculate('sub', 10, 4)).toBe(6);
    });

    test('multiplication: 45 * 2 => 90', () => {
      expect(calculate('mul', 45, 2)).toBe(90);
    });

    test('division: 20 / 5 => 4', () => {
      expect(calculate('div', 20, 5)).toBe(4);
    });

    test('division by zero throws an error', () => {
      expect(() => calculate('div', 5, 0)).toThrow('Division by zero');
    });

    test('unsupported operation throws', () => {
      expect(() => calculate('pow', 2, 3)).toThrow(/Unsupported operation/);
    });

    test('works with floating point numbers', () => {
      expect(calculate('add', 0.1, 0.2)).toBeCloseTo(0.30000000000000004);
    });
  });

  describe('extended operations', () => {
    test('modulo: 5 % 2 => 1', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('modulo with negative divisor works consistently', () => {
      expect(modulo(5, -2)).toBe(1);
    });

    test('power: 2 ^ 3 => 8', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('power with negative exponent', () => {
      expect(power(2, -1)).toBeCloseTo(0.5);
    });

    test('squareRoot: 16 => 4', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('squareRoot of non-perfect square', () => {
      expect(squareRoot(2)).toBeCloseTo(Math.sqrt(2));
    });

    test('squareRoot of negative number throws', () => {
      expect(() => squareRoot(-1)).toThrow('Cannot compute square root of negative number');
    });
  });
});
