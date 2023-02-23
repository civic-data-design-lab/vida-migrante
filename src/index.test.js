import { convertToOrdinal } from '$lib/utils/functions';
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});

describe('ordinal suffix test', () => {
  it('converts 1 to 1st', () => {
    expect(convertToOrdinal(1)).toBe('1st');
  });
  it('converts 2 to 2nd', () => {
    expect(convertToOrdinal(2)).toBe('2nd');
  });
  it('converts 3 to 3rd', () => {
    expect(convertToOrdinal(3)).toBe('3rd');
  });
  it('converts 4 to 4th', () => {
    expect(convertToOrdinal(4)).toBe('4th');
  });
});
