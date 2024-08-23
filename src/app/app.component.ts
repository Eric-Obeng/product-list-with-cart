import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    RouterOutlet,
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

  onClick() {
    this.showOrderSummary = false;
  }
}
