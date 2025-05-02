import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class SearchFormComponent {
  selectedOption: string = 'Todos';
  isDropdownOpen: boolean = false;
  searchText: string = '';

  @Output() filterChange = new EventEmitter<{ searchText: string; selectedOption: string }>();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  

  onSearchChange() {
    this.filterChange.emit({
      searchText: this.searchText,
      selectedOption: this.selectedOption
    });
  }
  
  selectOption(option: string) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.emitFilterChange();
  }

  onSearchInput(event: any) {
    this.searchText = event.target.value;
    this.emitFilterChange();
  }

  emitFilterChange() {
    this.filterChange.emit({ searchText: this.searchText, selectedOption: this.selectedOption });
    
  }
}
