import { getStorageAdapter } from '../utils';
import { DataStorage } from '../types';

const storage: DataStorage = {
  setItem: () => {},
  getItem: () => '',
  removeItem: () => {},
};

describe('Tests for getStorageAdapter', () => {
  it('should return same keys', () => {
    const result = getStorageAdapter(storage, 'test-key');
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(Object.keys(storage)),
    );
  });
});
