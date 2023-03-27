import { applyUpdates, getOrdinalSuffix, isFoodSecure } from '$lib/utils/functions';
import { CopingLevels } from '$lib/utils/types';
import { describe, it, expect } from 'vitest';

describe('sum test', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
});

describe('ordinal suffix test', () => {
  it('gets "st" from 1', () => {
    expect(getOrdinalSuffix(1)).toBe('st');
  });
  it('gets "nd" from 2', () => {
    expect(getOrdinalSuffix(2)).toBe('nd');
  });
  it('gets "rd" from 3', () => {
    expect(getOrdinalSuffix(3)).toBe('rd');
  });
  it('gets "th" from 4', () => {
    expect(getOrdinalSuffix(4)).toBe('th');
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

  it('sets values with the "!" prefix', () => {
    const originalObject = {
      a: 20,
    };
    const updatesObject = {
      a: '!0',
    };
    applyUpdates(originalObject, updatesObject);
    expect(originalObject).toStrictEqual({ a: 0 });
  });
});

describe('food security calculation test', () => {
  it('Displays food secure', () => {
    const expenses = 100,
      householdSize = 10;
    const actual = isFoodSecure(expenses, householdSize, null);
    expect(actual).toBe(true);
  });

  it('Displays food insecure', () => {
    const expenses = 100,
      householdSize = 10,
      copingLevel = CopingLevels.STRESS;
    const actual = isFoodSecure(expenses, householdSize, copingLevel);
    expect(actual).toBe(false);
  });

  // TODO: Add more tests if needed
});
