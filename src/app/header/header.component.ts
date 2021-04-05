import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() logout = new EventEmitter<void>();
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() deleteAccount = new EventEmitter<void>();

  @Input() username: string;

  /**
   * Emit an event when the user clicks the menu button
   */
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }

  /**
   * Emit an event when the user clicks the logout button
   */
  onLogout(): void {
    this.logout.emit();
  }
  
  /**
   * Emit an event when the user clicks the delete account button
   */
  onDeleteAccount(): void {
    this.deleteAccount.emit();
  }
}
