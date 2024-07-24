import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiProduitService } from '../services/api-produit.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Output() productSelected = new EventEmitter<any>();
  @Output() grandTotalUpdated = new EventEmitter<number>();
  produits: any[] = [];
  selectedProducts: any[] = [];
  grandTotal: number = 0;

  constructor(private api: ApiProduitService) { }

  ngOnInit() {
    this.getProduits();
  }

  getProduits() {
    this.api.GetProduit().subscribe((data: any) => {
      this.produits = data;
    });
  }

  onProductSelect(event: any) {
    const productId = event.target.value;
    const selectedProduct = this.produits.find(produit => produit._id === productId);
    if (selectedProduct) {
      const productCopy = { 
        ...selectedProduct, 
        quantity: 1, 
        unitPrice: selectedProduct.Prix, 
        totalPrice: selectedProduct.Prix, 
        CoutLivraison: selectedProduct.CoutLivraison || 0, 
        FraisLivraison: selectedProduct.FraisLivraison || 0 
      };
      this.selectedProducts.unshift(productCopy);  // Ajouter le produit en haut de la liste
      this.updateGrandTotal();
      this.productSelected.emit(selectedProduct);
    }
  }

  updateTotalPrice(product: any) {
    product.totalPrice = product.quantity * product.unitPrice;
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    if (this.selectedProducts.length > 0) {
      const firstProduct = this.selectedProducts[0];
      this.grandTotal = this.selectedProducts.reduce((acc, product) => acc + product.totalPrice, 0) + firstProduct.CoutLivraison + firstProduct.FraisLivraison;
    } else {
      this.grandTotal = 0;
    }
    this.grandTotalUpdated.emit(this.grandTotal);
  }

  removeProduct(index: number): void {
    this.selectedProducts.splice(index, 1);
    this.updateGrandTotal();
  }
}
