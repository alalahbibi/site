import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Commande } from '../commandes/commandes.component';
export interface CommandModification {
  date: Date;
  modifiedBy: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCommandeService {
  private apiUrl = 'http://localhost:5000/commandes'; 
  readonly BaseURI = 'http://localhost:5000/api';
  private commandes: Commande[] = []

  constructor(private http: HttpClient) { }

  getCommandes(): Observable<any> {
    return this.http.get(`${this.BaseURI}/listercommande`);
  }

  deleteCommande(commandeId: string): Observable<any> {
    return this.http.delete(`${this.BaseURI}/commande/${commandeId}`);
  }

  updateCommande(id: string, updatedCommande: Commande): Observable<any> {
    return this.http.put(`${this.BaseURI}/commande/${id}`, updatedCommande);
  }  

  ajouterCommande(commande: Commande): Observable<any> {
    return this.http.post(`${this.BaseURI}/commande`, commande);
  }
  postCommande(commande: any) {
    return this.http.post(`${this.BaseURI}/commande`, commande);
  }

  createCommande(commandeData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/create`, commandeData, { headers });
  }
  getCommande(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.BaseURI);
  }

 
}
