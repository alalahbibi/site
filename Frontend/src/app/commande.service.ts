import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private selectedProducts: any[] = [];

  constructor() { }

  getSelectedProducts() {
    return this.selectedProducts;
  }

  addProduct(product: any) {
    this.selectedProducts.push(product);
  }

  removeProduct(index: number) {
    this.selectedProducts.splice(index, 1);
  }

  getTotal(): number {
    let total = 0;
    for (const product of this.selectedProducts) {
      total += product.totalPrice || 0;
    }
    return total;
  }

  clearProducts() {
    this.selectedProducts = [];
  }
}
