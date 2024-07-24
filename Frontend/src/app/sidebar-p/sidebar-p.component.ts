import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-sidebar-p',
  templateUrl: './sidebar-p.component.html',
  styleUrls: ['./sidebar-p.component.css']
})
export class SidebarPComponent  {
  isOpen = true;
  isDropdown1Open = false;
  isDropdown2Open = false;
  activeLink: string = '';

  constructor(private sharedService: SharedService) {
    this.sharedService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (!isOpen) {
        this.closeAllDropdowns(); // Fermer les dropdowns lorsque la sidebar est fermée
      }
    });
  }

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }

  closeSidebar() {
    this.sharedService.setSidebarOpen(false);
    this.closeAllDropdowns(); // Fermer les dropdowns lorsque la sidebar est fermée
  }

  toggleDropdown1() {
    this.isDropdown1Open = !this.isDropdown1Open;
    if (this.isDropdown1Open && this.isDropdown2Open) {
      this.isDropdown2Open = false; // Fermer le dropdown 2 si le dropdown 1 est ouvert
    }
  }

  toggleDropdown2() {
    this.isDropdown2Open = !this.isDropdown2Open;
    if (this.isDropdown2Open && this.isDropdown1Open) {
      this.isDropdown1Open = false; // Fermer le dropdown 1 si le dropdown 2 est ouvert
    }
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

  private closeAllDropdowns() {
    this.isDropdown1Open = false;
    this.isDropdown2Open = false;
  }
}
