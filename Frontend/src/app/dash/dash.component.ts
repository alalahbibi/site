import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  showUpdateForm: boolean = false;
  sidebarOpen: boolean = true;
  villes: string[] = [];
  delegations: string[] = [];
  selectedVille: string | undefined;
  user = {
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };
  message: string = '';

 
  constructor(private sharedService: SharedService,private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.sharedService.sidebarOpen$.subscribe(open => {
      this.sidebarOpen = open;
    });

  }

 


  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }

  cancelForm(): void {
    this.showUpdateForm = false;
  }

  onVilleSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedVille = target.value;
    this.delegations = this.sharedService.getDelegations(this.selectedVille);
  }
  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        this.message = 'User registered successfully';
        // Rediriger vers la page de connexion après l'inscription
        this.router.navigate(['/login']);
      },
      error => {
        this.message = error.error.message;
      }
    );
  }
}
