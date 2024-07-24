import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  // Ensure you have this import
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiProduitService {
  private apiUrl = 'http://localhost:5000/users';
  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();

  constructor(private http: HttpClient) { }

  PostProduit(produit: any) {
    return this.http.post(`${this.apiUrl}/produit2`, produit);
  }

  GetProduit() {
    return this.http.get(`${this.apiUrl}/listerproduit`);
  }
  
  GetProduitById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/produit2/${id}`);
  }
  updateTotal(total: number) {
    this.totalSubject.next(total);
  }
 
  DeleteProduit(id: string) {
    return this.http.delete(this.apiUrl + '/produit2/' + id);
  }
   // Mettre à jour un produit
   UpdateProduit(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/produit2/${id}`, data);
  }

}
