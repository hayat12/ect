import { Pipe, PipeTransform } from '@angular/core';
import { SortDirection } from '../enums/sort-direction.enum';

@Pipe({
  name: 'sort',
  standalone: true
})
export class SortPipe implements PipeTransform {
  transform(array: any[] | null, field: string, sortDirection: SortDirection = SortDirection.ASC): any[] {
    if (array==null) {
      return [];
    }
    if (!Array.isArray(array) || !field) return array;

    return array.sort((a, b) => {
      const valueA = this.getValue(a, field);
      const valueB = this.getValue(b, field);

      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return sortDirection === SortDirection.ASC ? -1 : 1;
      if (valueB == null) return sortDirection === SortDirection.ASC ? 1 : -1;

      if (valueA < valueB) return sortDirection === SortDirection.ASC ? -1 : 1;
      if (valueA > valueB) return sortDirection === SortDirection.ASC ? 1 : -1;
      return 0;
    });
  }

  private getValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
