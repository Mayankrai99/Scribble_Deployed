import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propName: string): any[] {
    // const resultArray = [];
    if (value.length === 0 || filterString === '' || propName === '') {
      return value;
    }

    const resultArray = value.filter((item) => 
      item[propName]?.toLowerCase().includes(filterString.toLowerCase())
    );

    // for (const item of value) {
    //   if (item[propName].toLowerCase() === filterString.toLowerCase()) {
    //     resultArray.push(item);
    //   }
    // }
    return resultArray.length > 0 ? resultArray : [];
  }
}
