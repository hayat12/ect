import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ect-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  @Input({required: true}) item!: Product;
}
