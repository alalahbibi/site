import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ApiProduitService } from '../services/api-produit.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-produit-p',
  templateUrl: './produit-p.component.html',
  styleUrls: ['./produit-p.component.css']
})
export class ProduitPComponent implements OnInit {
  showUpdateForm: boolean = false;
  sidebarOpen: boolean = true;
  pro: any[] = [];
  Produit: any = {
    Image: "",
    Nom: "",
    Affiche: "",
    Prix: "",
    Categorie: "",
    Remise: "",
    Cout: "",
    GestionStock: "",
    FraisLivraison: "",
    CoutLivraison: "",
    Stock: "" 
  };
  selectedProductId: string | null = null;
  showApercuModal: boolean = false;
  searchTerm: string = '';

  constructor(
    private sharedService: SharedService,
    private api: ApiProduitService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.sharedService.sidebarOpen$.subscribe(open => {
      this.sidebarOpen = open;
    });
    this.getproduit();
  }

  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
  }

  cancelForm(): void {
    this.showUpdateForm = false;
    this.resetForm();
  }

  ajouter(): void {
    if (this.selectedProductId) {
      // Mise à jour du produit
      this.api.UpdateProduit(this.selectedProductId, this.Produit).subscribe(
        (data: any) => {
          console.log('Produit mis à jour', data);
          this.toastr.success('Produit mis à jour avec succès !', 'Succès');
          this.pro = this.pro.map(p => p._id === this.selectedProductId ? data : p);
          this.cancelForm();
        },
        error => {
          console.error('Erreur lors de la mise à jour', error);
          this.toastr.error('Erreur lors de la mise à jour du produit', 'Erreur');
        }
      );
    } else {
      // Ajout d'un nouveau produit
      this.api.PostProduit(this.Produit).subscribe(
        (data: any) => {
          console.log('Produit ajouté', data);
          this.toastr.success('Produit ajouté avec succès !', 'Succès');
          this.pro.unshift(data);
          this.cancelForm();
        },
        error => {
          console.error('Erreur lors de l\'ajout', error);
          this.toastr.error('Erreur lors de l\'ajout du produit', 'Erreur');
        }
      );
    }
  }

  supprimer(id: string): void {
    this.api.DeleteProduit(id).subscribe(
      (data: any) => {
        console.log('Produit supprimé', data);
        this.toastr.success('Produit supprimé avec succès !', 'Succès');
        this.pro = this.pro.filter(produit => produit._id !== id);
      },
      error => {
        console.error('Erreur lors de la suppression', error);
        this.toastr.error('Erreur lors de la suppression du produit', 'Erreur');
      }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.Produit.Image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getproduit(): void {
    this.api.GetProduit().subscribe(
      (data: any) => {
        console.log('Produits récupérés', data);
        this.pro = data;
      },
      error => {
        console.error('Erreur lors de la récupération des produits', error);
        this.toastr.error('Erreur lors de la récupération des produits', 'Erreur');
      }
    );
  }

  editProduit(produit: any): void {
    this.Produit = { ...produit };
    this.selectedProductId = produit._id;
    this.showUpdateForm = true;
  }

  resetForm(): void {
    this.Produit = { 
      Image: "",
      Nom: "",
      Affiche: "",
      Prix: "",
      Categorie: "",
      Remise: "",
      Cout: "",
      GestionStock: "",
      FraisLivraison: "",
      CoutLivraison: "",
      Stock: "" 
    };
    this.selectedProductId = null;
  }

  apercuProduit(produit: any): void {
    this.Produit = { ...produit };
    this.showApercuModal = true;
  }

  closeApercuModal(): void {
    this.showApercuModal = false;
    this.resetForm();
  }

  get filteredProduits() {
    if (!this.searchTerm) {
      return this.pro;
    }
    return this.pro.filter(produit => 
      produit.Nom.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
      produit.Affiche.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}