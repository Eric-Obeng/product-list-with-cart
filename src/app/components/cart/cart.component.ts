import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interface/product.model';
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  emptyCart: number = 0;
  cartItems: Product[] = [];
  showOrderSummary: boolean = false;
  @Output() confirmOrder = new EventEmitter<void>()

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((data) => {
      this.cartItems = data;
      this.emptyCart = this.cartItems.length;
    });
  }

  getTotalItems(): number {
    return this.cartService.getTotalItems();
  }

  removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }

  onConfirmOrder() {
    this.confirmOrder.emit();
  }
}
