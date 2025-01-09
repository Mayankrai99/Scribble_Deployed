// import { SortPipe } from './sort.pipe';

// describe('SortPipe', () => {
//   let pipe: SortPipe;

//   beforeEach(() => {
//     pipe = new SortPipe();
//   });

//   it('should create the pipe', () => {
//     expect(pipe).toBeTruthy();
//   });

//   it('should return the same array if the value is null or empty', () => {
//     const emptyArray: string[] = [];
//     const nullArray = null;

//     const resultEmpty = pipe.transform(emptyArray, ['name', 'asc']);
//     //const resultNull = pipe.transform(nullArray, ['name', 'asc']);

//     expect(resultEmpty).toEqual(emptyArray);
//     //expect(resultNull).toBeNull();
//   });

//   it('should return the same array if args are invalid', () => {
//     const arr = ['apple', 'banana', 'cherry'];

//     const resultInvalidArgs1 = pipe.transform(arr, []);
//     const resultInvalidArgs2 = pipe.transform(arr, ['name']);
//     const resultInvalidArgs3 = pipe.transform(arr, [null, 'asc']);

//     expect(resultInvalidArgs1).toEqual(arr);
//     expect(resultInvalidArgs2).toEqual(arr);
//     expect(resultInvalidArgs3).toEqual(arr);
//   });

//   it('should sort the array in ascending order based on the field', () => {
//     const arr = [
//       { name: 'banana' },
//       { name: 'apple' },
//       { name: 'cherry' }
//     ];
    
//     //const sorted = pipe.transform(arr, ['name', 'asc']);
    
//     // expect(sorted[0].name).toBe('apple');
//     // expect(sorted[1].name).toBe('banana');
//     // expect(sorted[2].name).toBe('cherry');
//   });

//   it('should sort the array in descending order based on the field', () => {
//     const arr = [
//       { name: 'banana' },
//       { name: 'apple' },
//       { name: 'cherry' }
//     ];
    
//     // const sorted = pipe.transform(arr, ['name', 'desc']);
    
//     // expect(sorted[0].name).toBe('cherry');
//     // expect(sorted[1].name).toBe('banana');
//     // expect(sorted[2].name).toBe('apple');
//   });

//   it('should handle null or undefined values in the field gracefully', () => {
//     const arr = [
//       { name: 'banana' },
//       { name: 'apple' },
//       { name: undefined },
//       { name: null },
//     ];

//     // const sorted = pipe.transform(arr, ['name', 'asc']);

//     // expect(sorted[0].name).toBe('apple');
//     // expect(sorted[1].name).toBe('banana');
//     // expect(sorted[2].name).toBe(null);
//     // expect(sorted[3].name).toBe(undefined);
//   });

//   it('should handle sorting of an array of strings', () => {
//     const arr = ['banana', 'apple', 'cherry'];

//     const sortedAsc = pipe.transform(arr, [0, 'asc']);
//     expect(sortedAsc).toEqual(['apple', 'banana', 'cherry']);

//     const sortedDesc = pipe.transform(arr, [0, 'desc']);
//     expect(sortedDesc).toEqual(['cherry', 'banana', 'apple']);
//   });
// });