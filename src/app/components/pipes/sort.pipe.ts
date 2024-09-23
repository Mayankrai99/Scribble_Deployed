import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Array<string>, args: any[]): any {

    if (!value || value.length === 0 || !args || args.length < 2) {
      return value;
    }

    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = 1;

    if (sortDirection === 'desc') {
      multiplier = -1;
    }

    value.sort((a: any, b: any) => {

      const aField = a?.[sortField] ?? ''; // Handle null or undefined
      const bField = b?.[sortField] ?? ''; // Handle null or undefined
      if (aField < bField) {
        return -1 * multiplier;
      } else if (aField > bField) {
        return 1 * multiplier;
      } else {
        return 0;
      }
    });

    return value;
  }
}
