import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { Product } from '../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { SortPipe } from '../../shared/pipes/sort.pipe';
import { SortDirection } from '../../shared/enums/sort-direction.enum';

@Component({
  selector: 'ect-repeater',
  standalone: true,
  imports: [CommonModule, SortPipe],
  template: `<ng-container *ngFor="let item of (data | sort: sortField: sortDirection)">
  <ng-template [ngTemplateOutlet]="template" [ngTemplateOutletContext]="{ item: item }"></ng-template>
</ng-container>`,
  styles: []
})
export class RepeaterComponent {
  @Input({required: true}) sortField: string = 'price';
  @Input({required: true}) sortDirection: SortDirection = SortDirection.DESC;

  @Input({ required: true }) data: Array<Product> | null = [];
  @ContentChild(TemplateRef, { static: true }) template!: TemplateRef<any>;

}
