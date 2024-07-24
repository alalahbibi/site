import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ApiCommandeService, } from '../services/api-commande.service';
import { ToastrService } from 'ngx-toastr';
import { ApiProduitService } from '../services/api-produit.service';

export interface Product {
  _id: string;
  Nom: string;
  Prix: number;
  quantite: number;
  total: number;
}

export interface CommandModification {
  date: Date;
  modifiedBy: string;
  details: string;
}

export interface Commande {
  Statut: string;
  Societe: string;
  NotePersonel: string;
  NomClient: string;
  NoteClinet: string;
  TelephoneClient: string;
  PhoneClient: string;
  AdresseClinet: string;
  VilleClinet: string;
  DelegationClinet: string;
  CoutLivraison: number;
  FraisLivraison: number;
  total: number;
  produits: Product[];
  Date: Date;

}

@Component({
  selector: 'app-commande-p',
  templateUrl: './commande-p.component.html',
  styleUrls: ['./commande-p.component.css']
})
export class CommandePComponent implements OnInit {
  showUpdateForm: boolean = false;
  sidebarOpen: boolean = true;
  villes: string[] = [];
  delegations: string[] = [];
  selectedVille: string | undefined;
  produits: any[] = [];
  selectedProducts: any[] = [];
  commandes: any[] = [];
  grandTotal: number = 0;
  filteredCommandes: Commande[] = [];
  searchTerm: string = '';
  commandeToUpdate: any = null;
  showModal: boolean = false; // Indicateur d'affichage du modal
  currentCommande: Commande | null = null; 
  showHistoryModal: boolean = false;
  commandHistory: CommandModification[] = [];
  user: any;

  Commande: Commande = {
    Statut: "",
    Societe: "",
    NotePersonel: "",
    NomClient: "",
    NoteClinet: "",
    TelephoneClient: "",
    PhoneClient: "",
    AdresseClinet: "",
    VilleClinet: "",
    DelegationClinet: "",
    CoutLivraison: 0,
    FraisLivraison: 0,
    total: 0,
    produits: [],
    Date: new Date(),
  };

  commandeData = {
    id: '819',
    tel_cl: '',
    nom_prenom_cl: '',
    ville_cl: '',
    delegation_cl: '',
    cod: '',
    libelle: '',
    nb_piece: '',
    adresse_cl: '',
    remarque: '',
    tel_2_cl: '00000000',
    service: ''
  };

  constructor(
    private sharedService: SharedService,
    private api: ApiCommandeService,
    private toastr: ToastrService,
    private api2: ApiProduitService,

  ) {
    this.villes = this.sharedService.getVilles();
  }
  statuses = [
    { value: 'confirmee', label: 'Confirmée', color: '#a3e635' },
    { value: 'rejeter', label: 'Rejeter', color: '#f87171' },
    { value: 'tentative', label: 'Tentative', color: '#facc15' }
  ];


  ngOnInit() {
    this.sharedService.sidebarOpen$.subscribe(open => {
      this.sidebarOpen = open;
    });
    this.api2.GetProduit().subscribe((data: any) => {
      this.produits = data.contactproduit.map((product: any) => ({
        _id: product._id,
        Nom: product.Nom,
        Prix: parseFloat(product.Prix),
        quantite: 1,
        total: parseFloat(product.Prix)
      }));
    });
    this.api.getCommandes().subscribe(data => {
      this.commandes = data;
      this.filteredCommandes = data;
    });
    this.chargerCommandes(); 

      const savedHistory = localStorage.getItem('commandHistory');
      if (savedHistory) {
        this.commandHistory = JSON.parse(savedHistory);
      }
  }
  openHistoryModal(commande: Commande): void {
    // Vérifier si des modifications ont été faites
    const hasChanges = this.commandHistory.some(mod => mod.date === new Date());

    if (!hasChanges) {
      const modifiedBy = this.user ? `${this.user.firstName} ${this.user.lastName}` : 'Utilisateur inconnu';
      
      const modificationDetails = [
        `Statut modifié à "${commande.Statut}"`,
        `Société de livraison modifiée à "${commande.Societe}"`,
      ].join('\n');

      this.commandHistory.push({
        date: new Date(),
        modifiedBy: modifiedBy,
        details: modificationDetails
      });

      // Sauvegarder l'historique dans le stockage local
      localStorage.setItem('commandHistory', JSON.stringify(this.commandHistory));
    }

    this.showHistoryModal = true;
  }

  closeHistoryModal(): void {
    this.showHistoryModal = false;
  }


  // Ajoutez une méthode pour charger l'historique des modifications depuis une source (si nécessaire)
  chargerCommande() {
    // Exemple de chargement des commandes et de l'historique des modifications
    this.api.getCommandes().subscribe(data => {
      this.commandes = data;
      this.filteredCommandes = data;

      // Chargez l'historique des modifications pour chaque commande
      this.commandes.forEach(commande => {
        // Exemple de chargement d'un historique fictif pour chaque commande
        const historiqueFictif: CommandModification[] = [
          {
            date: new Date(),
            modifiedBy: 'Admin',
            details: `Création de la commande avec le statut "${commande.Statut}"`
          },
          // Ajoutez d'autres modifications fictives ou réelles ici
        ];
        this.commandHistory = this.commandHistory.concat(historiqueFictif);
      });
    });
  }
  // Méthode pour ouvrir le modal apercu et afficher les informations de la commande
  openModal(index: number): void {
    this.currentCommande = this.filteredCommandes[index];
    this.showModal = true;
  }
  

// Méthode pour fermer le modal
closeModal(): void {
  this.showModal = false;
  this.currentCommande = null;
}
// Chercher de commande a partir nom ou statue
  onSearchTermChange() {
    this.filteredCommandes = this.commandes.filter(commande =>
      commande.NomClient.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      commande.Statut.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  getProduits() {
    this.api2.GetProduit().subscribe((data: any) => {
      this.produits = data;
    });
  }

  onProductSelected(product: Product) {
    this.selectedProducts.push(product);
    this.Commande.produits = this.selectedProducts;
    this.updateCommandeTotal();
  }

  onGrandTotalUpdated(total: number) {
    this.grandTotal = total;
    this.updateCommandeTotal();
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.Commande.produits = this.selectedProducts;
    this.updateCommandeTotal();
  }

  updateTotal(product: Product): void {
    product.total = product.Prix * product.quantite;
    this.updateCommandeTotal();
  }

  updateCommandeTotal(): void {
    this.Commande.total = this.selectedProducts.reduce((sum, product) => sum + product.total, 0) + this.Commande.CoutLivraison + this.Commande.FraisLivraison;
  }

  openUpdateForm(index: number): void {
    this.commandeToUpdate = { ...this.commandes[index] };
    this.Commande = { ...this.commandeToUpdate };
    this.showUpdateForm = true;
  }

  ajouter() {
    if (this.commandeToUpdate) {
      this.Commande.NomClient = this.commandeData.nom_prenom_cl;
      this.Commande.TelephoneClient = this.commandeData.tel_cl;
      this.Commande.PhoneClient = this.commandeData.tel_2_cl;
      this.Commande.AdresseClinet = this.commandeData.adresse_cl;
      this.Commande.VilleClinet = this.commandeData.ville_cl;
      this.Commande.DelegationClinet = this.commandeData.delegation_cl;
      this.Commande.NoteClinet = this.commandeData.remarque;
      // Mise à jour de la commande existante
      this.api.updateCommande(this.commandeToUpdate._id, this.Commande).subscribe((data: any) => {
        this.toastr.success('Commande mise à jour avec succès!', 'Succès');
        this.cancelForm();
        this.resetForm();
        this.chargerCommandes();
      });
    } else {
      // Ajout d'une nouvelle commande
      this.Commande.NomClient = this.commandeData.nom_prenom_cl;
      this.Commande.TelephoneClient = this.commandeData.tel_cl;
      this.Commande.PhoneClient = this.commandeData.tel_2_cl;
      this.Commande.AdresseClinet = this.commandeData.adresse_cl;
      this.Commande.VilleClinet = this.commandeData.ville_cl;
      this.Commande.DelegationClinet = this.commandeData.delegation_cl;
      this.Commande.NoteClinet = this.commandeData.remarque;
      this.Commande.Date = new Date();
      this.Commande.total = this.grandTotal;
      this.api.createCommande(this.commandeData).subscribe(() => {
        this.toastr.success('Commande mongodb ajoutée avec succès!', 'Succès');
        this.resetForm();
      });
      this.api.postCommande(this.Commande).subscribe((data: any) => {
        console.log('DataCommande', data);
        this.toastr.success('Commande ajoutée avec succès!', 'Succès');
        this.ngOnInit();
        this.resetForm();
        this.chargerCommandes();
      });
    }
  }
  resetForm() {
    this.Commande = {
      Statut: "",
      Societe: "",
      NotePersonel: "",
      NomClient: "",
      NoteClinet: "",
      TelephoneClient: "",
      PhoneClient: "",
      AdresseClinet: "",
      VilleClinet: "",
      DelegationClinet: "",
      CoutLivraison: 0,
      FraisLivraison: 0,
      total: 0,
      produits: [],
      Date: new Date()
    };
    this.selectedProducts = [];
    this.grandTotal = 0;
    this.commandeToUpdate = null;
    this.commandeData = {
      id: '819',
      tel_cl: '',
      nom_prenom_cl: '',
      ville_cl: '',
      delegation_cl: '',
      cod: '',
      libelle: '',
      nb_piece: '',
      adresse_cl: '',
      remarque: '',
      tel_2_cl: '00000000',
      service: ''
    };
  }

  chargerCommandes(): void {
    this.api.getCommandes().subscribe((data: any) => {
      // Trier les commandes par date en ordre décroissant
      this.commandes = data.sort((a: any, b: any) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
      this.filteredCommandes = this.commandes.slice();
    }, error => {
      console.error('Erreur lors du chargement des commandes :', error);
      this.toastr.error('Erreur lors du chargement des commandes.', 'Erreur');
    });
  }

  deleteCommande(index: number) {
    const commandeId = this.commandes[index]._id; // Utilisez la propriété _id ou autre propriété d'identification disponible
    if (commandeId && confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.api.deleteCommande(commandeId).subscribe(() => {
        this.commandes.splice(index, 1);
        this.filteredCommandes = this.commandes.slice(); // Mettez à jour le tableau filtré
        this.toastr.success('Commande supprimer avec succès!', 'Succès');

      });
    } else {
      console.error('No valid ID found for the commande');
    }
  }


  resetSelectedProducts() {
    this.selectedProducts = [];
    this.Commande.produits = [];
  }

  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
    if (this.showUpdateForm) {
      this.resetSelectedProducts();
    }

  }

  cancelForm(): void {
    this.showUpdateForm = false;
    this.commandeToUpdate = {}; // Réinitialisez l'objet commandeToUpdate
    this.resetForm(); // Réinitialiser les données du formulaire

  }

  onVilleSelected(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedVille = target.value;
    this.delegations = this.sharedService.getDelegations(this.selectedVille);
  }
  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredCommandes = this.commandes.slice(); // Réinitialiser à la liste complète si le terme de recherche est vide
    } else {
      this.filteredCommandes = this.commandes.filter(commande =>
        commande.NomClient.toLowerCase().includes(searchTerm) ||
        commande.Statut.toLowerCase().includes(searchTerm)
      );
    }
  }
 
  formatCurrency(value: number): string {
    return value.toLocaleString('fr-TN', { style: 'currency', currency: 'TND', currencyDisplay: 'symbol' }).replace('TND', '') + '';
  }
  
}


