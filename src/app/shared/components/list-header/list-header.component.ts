import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortDirection } from '../../enums/sort-direction.enum';
import { SortHeader } from '../../interface/sort-header.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ect-list-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-header.component.html',
  styleUrl: './list-header.component.scss'
})
export class ListHeaderComponent {
  @Input({required: true}) columns: Array<SortHeader> = [];

  sortField: string = '';
  sortDirection: SortDirection = SortDirection.DESC;
  @Output() sortChange = new EventEmitter<{ field: string; sortDirection: SortDirection }>();


  getSortIndicator(column: string): string {
    if (column !== this.sortField) {
      return '↑↓';
    }
    return this.sortDirection === SortDirection.ASC ? '↑' : '↓';
  }

    onSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === SortDirection.DESC ? SortDirection.ASC : SortDirection.DESC;
    } else {
      this.sortField = field;
      this.sortDirection = SortDirection.ASC;
    }
    this.sortChange.emit({field, sortDirection: this.sortDirection});
  }

}
