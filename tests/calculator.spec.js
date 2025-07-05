const { add, getCalledCount } = require('../src/calculator');

describe('String Calculator', () => {
  test('Empty string returns 0', () => {
    expect(add('')).toBe(0);
  });

  test('Single number returns the number itself', () => {
    expect(add('4')).toBe(4);
  });

  test('Comma-separated numbers are summed', () => {
    expect(add('1,2,3')).toBe(6);
  });

  test('Newlines act as delimiters', () => {
    expect(add('1\n2,3')).toBe(6);
  });

  test('Custom single-character delimiter works (e.g., //;\\n1;2)', () => {
    expect(add('//;\n1;2')).toBe(3);
  });

  test('Numbers >1000 are ignored', () => {
    expect(add('2,1001')).toBe(2);
    expect(add('1001')).toBe(0);
  });

  test('Negative numbers throw error with message', () => {
    expect(() => add('1,-2')).toThrow('Negatives not allowed: -2');
    expect(() => add('1,-2,-5')).toThrow('Negatives not allowed: -2,-5');
  });
  
});
