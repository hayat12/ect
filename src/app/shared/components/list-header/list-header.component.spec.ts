import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortDirection } from '../../enums/sort-direction.enum';
import { SortHeader } from '../../interface/sort-header.interface';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from './list-header.component';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;
  let mockColumns: SortHeader[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;

    // Mock input columns
    mockColumns = [
      { text: 'title', value: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', sortable: true, disabled: false },
      { text: 'title', value: 'Mens Casual Premium Slim Fit T-Shirts', sortable: true, disabled: false },
    ];

    component.columns = mockColumns;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.sortField).toBe('');
    expect(component.sortDirection).toBe(SortDirection.DESC);
  });

  it('should get correct sort indicator for a column', () => {
    component.sortField = 'name';
    component.sortDirection = SortDirection.ASC;
    expect(component.getSortIndicator('name')).toBe('↑');

    component.sortDirection = SortDirection.DESC;
    expect(component.getSortIndicator('name')).toBe('↓');

    expect(component.getSortIndicator('age')).toBe('↑↓');
  });

  it('should toggle sort direction when clicking on the same column', () => {
    component.onSort('name');
    expect(component.sortField).toBe('name');
    expect(component.sortDirection).toBe(SortDirection.ASC);

    component.onSort('name');
    expect(component.sortField).toBe('name');
    expect(component.sortDirection).toBe(SortDirection.DESC);
  });

  it('should set sort direction to ASC when sorting a new column', () => {
    component.onSort('age');
    expect(component.sortField).toBe('age');
    expect(component.sortDirection).toBe(SortDirection.ASC);

    component.onSort('name');
    expect(component.sortField).toBe('name');
    expect(component.sortDirection).toBe(SortDirection.ASC);
  });

  it('should emit sortChange event with correct values when sorting', () => {
    spyOn(component.sortChange, 'emit');

    component.onSort('name');
    expect(component.sortChange.emit).toHaveBeenCalledWith({
      field: 'name',
      sortDirection: SortDirection.ASC,
    });

    component.onSort('name');
    expect(component.sortChange.emit).toHaveBeenCalledWith({
      field: 'name',
      sortDirection: SortDirection.DESC,
    });
  });
});
