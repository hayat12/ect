import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Product } from '../../shared/interface/product.interface';
import { ProductsService } from '../../services/products.service';
import { Observable } from 'rxjs';
import { ListHeaderComponent } from '../../shared/components/list-header/list-header.component';
import { SortHeader } from '../../shared/interface/sort-header.interface';
import { CommonModule } from '@angular/common';
import { RepeaterComponent } from "../content-layout/repeater.component";
import { ItemComponent } from "./item/item.component";
import { SortDirection } from '../../shared/enums/sort-direction.enum';
import { PageHeaderComponent } from '../content-layout/page-header.component';

@Component({
  selector: 'ect-items',
  standalone: true,
  imports: [CommonModule, ListHeaderComponent, RepeaterComponent, ItemComponent, PageHeaderComponent],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent {
  private service = inject(ProductsService);
  items$: Observable<Array<Product>> = this.service.getProducts();

  sortField: string = 'price';
  sortDirection: SortDirection = SortDirection.DESC;

  columns: Array<SortHeader> = [
    { value: 'title', text: 'Title', sortable: true },
    { value: 'price', text: 'Price', sortable: true },
    { value: 'description', text: 'Description' },
    { value: 'category', text: 'Category' },
    { value: 'image', text: 'Image' },
    { value: 'rating.rate', text: 'Rating', sortable: true }
  ]

  onSortChange(sortConfig: { field: string; sortDirection: SortDirection }) {
    this.sortField = sortConfig.field;
    this.sortDirection = sortConfig.sortDirection;
  }
}
