import { Component, EventEmitter, Output } from '@angular/core';

/**
 * Navigation component to display the routes app
 * It emits an event when the user changes the page
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
})
export class NavigationComponent {
  @Output() changeActivePage = new EventEmitter<void>();

  onChangeActivePage(): void {
    this.changeActivePage.emit();
  }
}
