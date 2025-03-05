import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsComponent } from './items.component';
import { of } from 'rxjs';
import { Product } from '../../shared/interface/product.interface';
import { ProductsService } from '../../services/products.service';
import { SortDirection } from '../../shared/enums/sort-direction.enum';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    mockProductsService = jasmine.createSpyObj('ProductsService', ['getProducts']);
    const mockProducts: Product[] = [
      {
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
      },
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
          "rate": 4.1,
          "count": 259
        }
      }
    ];
    mockProductsService.getProducts.and.returnValue(of(mockProducts));

    TestBed.configureTestingModule({
      providers: [{ provide: ProductsService, useValue: mockProductsService }]
    });

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items$ with products from the service', (done) => {
    component.items$.subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products[0].title).toBe('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
      expect(products[1].title).toBe('Mens Casual Premium Slim Fit T-Shirts');
      done();
    });

    expect(mockProductsService.getProducts).toHaveBeenCalled();
  });

  it('should update sortField and sortDirection on onSortChange()', () => {
    const sortConfig = { field: 'title', sortDirection: SortDirection.ASC };

    component.onSortChange(sortConfig);

    expect(component.sortField).toBe('title');
    expect(component.sortDirection).toBe(SortDirection.ASC);
  });

  it('should have correct default columns', () => {
    expect(component.columns.length).toBe(6);
    expect(component.columns[0].value).toBe('title');
    expect(component.columns[1].value).toBe('price');
    expect(component.columns[2].sortable).toBeFalsy();
  });
});
