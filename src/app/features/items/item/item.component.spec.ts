import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Product } from '../../../shared/interface/product.interface';

@Component({
  selector: 'app-item',
  template: `
    <ng-container *ngIf="item">
      <div class="list-row">
        <div class="list-cell">{{ item.title }}</div>
        <div class="list-cell">{{ item.price }}</div>
        <div class="list-cell">{{ item.description }}</div>
        <div class="list-cell">{{ item.category }}</div>
        <div class="list-cell">
          <img [src]="item.image" alt="item Image" class="thumbnail">
        </div>
        <div class="list-cell">{{ item.rating.rate }}</div>
      </div>
    </ng-container>
  `
})
export class ItemComponent {
  @Input() item!: Product;
}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemComponent]
    });

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render item details when item is provided', () => {
    const mockItem: Product = {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    };

    component.item = mockItem;
    fixture.detectChanges();

    const cells = fixture.debugElement.queryAll(By.css('.list-cell'));
    expect(cells.length).toBe(6);
    expect(cells[0].nativeElement.textContent).toContain('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
    expect(cells[1].nativeElement.textContent).toContain('109.95');
    expect(cells[2].nativeElement.textContent).toContain("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday");
    expect(cells[3].nativeElement.textContent).toContain("men's clothing");
    expect(cells[5].nativeElement.textContent).toContain('3.9');

    // Check image
    const img = fixture.debugElement.query(By.css('.thumbnail'));
    expect(img.nativeElement.src).toBe('https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg');
    expect(img.nativeElement.alt).toBe('item Image');
  });

  it('should not render anything if item is not provided', () => {
    component.item = undefined!;
    fixture.detectChanges();

    const row = fixture.debugElement.query(By.css('.list-row'));
    expect(row).toBeNull(); // Expect no row to be rendered
  });
});
