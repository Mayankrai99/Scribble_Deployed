import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe();
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the same array if input value is empty', () => {
    const emptyArray: any[] = [];
    const result = pipe.transform(emptyArray, 'test', 'name');
    expect(result).toEqual(emptyArray);
  });

  it('should return the same array if filterString is empty', () => {
    const arr = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'cherry' }
    ];

    const result = pipe.transform(arr, '', 'name');
    expect(result).toEqual(arr);
  });

  it('should return the same array if propName is empty', () => {
    const arr = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'cherry' }
    ];

    const result = pipe.transform(arr, 'apple', '');
    expect(result).toEqual(arr);
  });

  it('should filter the array based on the filter string', () => {
    const arr = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'cherry' }
    ];

    const result = pipe.transform(arr, 'apple', 'name');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('apple');
  });

  it('should filter the array and return multiple matches', () => {
    const arr = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'cherry' },
      { name: 'apricot' }
    ];

    const result = pipe.transform(arr, 'ap', 'name');
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('apple');
    expect(result[1].name).toBe('apricot');
  });

  it('should return an empty array if no matches are found', () => {
    const arr = [
      { name: 'apple' },
      { name: 'banana' },
      { name: 'cherry' }
    ];

    const result = pipe.transform(arr, 'orange', 'name');
    expect(result).toEqual([]);
  });

  it('should handle case-insensitive filtering', () => {
    const arr = [
      { name: 'Apple' },
      { name: 'banana' },
      { name: 'Cherry' }
    ];

    const result = pipe.transform(arr, 'apple', 'name');
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Apple');
  });

  it('should return an empty array if the filter string does not match any value in the specified property', () => {
    const arr = [
      { name: 'apple', category: 'fruit' },
      { name: 'banana', category: 'fruit' },
      { name: 'carrot', category: 'vegetable' }
    ];

    const result = pipe.transform(arr, 'meat', 'category');
    expect(result).toEqual([]);
  });

  it('should return an empty array if the specified property does not exist in the object', () => {
    const arr = [
      { name: 'apple', category: 'fruit' },
      { name: 'banana', category: 'fruit' }
    ];

    const result = pipe.transform(arr, 'fruit', 'nonexistentProperty');
    expect(result).toEqual([]);
  });
});