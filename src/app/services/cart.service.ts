import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interface/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.cartItems);

  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(
      (item) => item.name === product.name
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {
      product.addedToCart = true;
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.name !== product.name
    );
    product.addedToCart = false;
    product.quantity = 0;
    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  clearCart() {
    this.cartItems.forEach((product) => (product.addedToCart = false));
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
}
