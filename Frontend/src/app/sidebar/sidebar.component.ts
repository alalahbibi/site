import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isOpen = true;
 

  constructor(private sharedService: SharedService, private api:AuthService) {
    this.sharedService.sidebarOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (!isOpen) {
      }
    });
  }

  toggleSidebar() {
    this.sharedService.toggleSidebar();
  }

  closeSidebar() {
    this.sharedService.setSidebarOpen(false);
  }



 

  
}
