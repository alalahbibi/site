import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Component({
  selector: 'app-personal',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit {
  user: any;
  message: string = '';
  messageAdmin: string = '';
  showUserProfile: boolean = false;  // Propriété pour gérer l'affichage du profil utilisateur

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.authService.getUserById(decodedToken.id, token).subscribe(
        response => {
          this.user = response.user;
        },
        error => {
          this.message = 'Erreur lors de la récupération des données utilisateur';
          console.error('Erreur:', error);
        }
      );
    } else {
      this.router.navigate(['/login']);  // Rediriger vers la page de connexion si aucun jeton n'est trouvé
    }

    const currentHour = new Date().getHours();
    this.messageAdmin = currentHour < 12 ? 'Bonjour' : 'Bonsoir';
  }

  toggleUserProfile(): void {
    this.showUserProfile = !this.showUserProfile;  // Basculer l'état d'affichage du profil utilisateur
  }
  getUsername(): string {
    return this.user ? this.user.username : 'Utilisateur inconnu';
  }
  

}
