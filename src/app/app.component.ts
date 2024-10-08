import { Component, inject } from '@angular/core';
import { ProductListComponent } from './components/product-item/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { Product } from './interface/product.model';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
      ProductListComponent,
      CartComponent,
      OrderSummaryComponent,
      CommonModule,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showOrderSummary: boolean = false;
  cartItems: Product[] = [];
  totalPrice: number = 0;

  private cartService = inject(CartService);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  onConfirmOrder() {
    this.showOrderSummary = true;
    document.body.classList.add('no-scroll');
  }

  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('app-order-summary')) {
      this.showOrderSummary = false;
      document.body.classList.remove('no-scroll');
    }
  }

  onOrderCompleted() {
    this.showOrderSummary = false;
    this.cartService.clearCart();
    document.body.classList.remove('no-scroll');
  }
}
