import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  HostListener,
} from '@angular/core';
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
  @Output() orderCompleted = new EventEmitter<void>();

  cartService = inject(CartService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.cartItems$.subscribe((items) => {
      this.CartItems = items;
    });
  }

  startNewOrder() {
    this.cartService.clearCart();
    this.orderCompleted.emit();
  }

  @HostListener('window:key.enter', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.startNewOrder();
      event.preventDefault();
    }
  }
}
