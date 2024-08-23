import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Product } from '../../interface/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  @Input() CartItems: Product[] = [];
  // @Input() totalPrice: number = 0;

  cartService = inject(CartService);
}
