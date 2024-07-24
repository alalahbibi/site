import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent  {
  sidebarOpen: boolean = true;
  showModal: boolean = false;

  user = {
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  message: string = '';

  constructor( 
    private toastr: ToastrService,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router) {}

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

  users: any[] = [];
  selectedUser: any = null;


  ngOnInit(): void {
    this.loadUsers();
    this.sharedService.sidebarOpen$.subscribe(open => {
      this.sidebarOpen = open;
    });
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  deleteUser(userId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      this.authService.deleteUser(userId).subscribe(
        () => {
          this.toastr.success('Personnels supprimer avec succès!', 'Succès');
          this.message = 'Utilisateur supprimé avec succès';
          this.loadUsers(); // Recharger la liste des utilisateurs
        },
        error => {
          this.message = 'Erreur lors de la suppression de l’utilisateur';
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  openModal(): void {
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }
  
}