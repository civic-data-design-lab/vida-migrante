import { applyUpdates, convertToOrdinal } from '$lib/utils/functions';
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

describe('resource updater test', () => {
  it('updates numeric values', () => {
    const originalObject = {
      a: 10,
      b: 10,
    };
    const updatesObject = {
      a: 5,
      b: -5,
    };
    applyUpdates(originalObject, updatesObject);
    expect(originalObject).toStrictEqual({ a: 15, b: 5 });
  });

  it('updates array values', () => {
    const originalObject = {
      a: [],
      b: ['item1'],
    };
    const updatesObject = {
      a: [],
      b: ['item2'],
    };
    applyUpdates(originalObject, updatesObject);
    expect(originalObject).toStrictEqual({ a: [], b: ['item1', 'item2'] });
  });

  it('updates nested values', () => {
    const originalObject = {
      a: { b: ['item1'] },
    };
    const updatesObject = {
      a: { b: ['item2'] },
    };
    applyUpdates(originalObject, updatesObject);
    expect(originalObject).toStrictEqual({ a: { b: ['item1', 'item2'] } });
  });

  it('updates miscellaneous values', () => {
    const originalObject = {
      a: { b: false },
      c: 'foo',
    };
    const updatesObject = {
      a: { b: true },
      c: 'bar',
    };
    applyUpdates(originalObject, updatesObject);
    expect(originalObject).toStrictEqual({ a: { b: true }, c: 'bar' });
  });

  it('ignores items that are not being updated', () => {
    const originalObject = {
      a: { b: ['item1'] },
      c: ['wow'],
      d: 5,
      e: 0,
    };
    const updatesObject = {
      a: { b: ['item2'] },
      e: 5,
    };
    applyUpdates(originalObject, updatesObject);
    expect(originalObject).toStrictEqual({ a: { b: ['item1', 'item2'] }, c: ['wow'], d: 5, e: 5 });
  });
});
