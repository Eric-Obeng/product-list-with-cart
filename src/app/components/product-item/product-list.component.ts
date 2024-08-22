import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Image, Product } from '../../interface/product.model';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  desserts: Product[] = [];
  currentBreakpoint: keyof Image = 'mobile';

  private dataServce = inject(DataService);
  private breakpointobserver = inject(BreakpointObserver);
  private cdRef = inject(ChangeDetectorRef);
  private cartService = inject(CartService);

  ngOnInit(): void {
    this.dataServce.getProduct().subscribe((data: Product[]) => {
      console.log(data);
      this.desserts = data;
    });

    this.breakpointobserver
      .observe([
        Breakpoints.HandsetPortrait,
        Breakpoints.HandsetLandscape,
        Breakpoints.TabletPortrait,
        Breakpoints.TabletLandscape,
        Breakpoints.WebPortrait,
        Breakpoints.WebLandscape,
      ])
      .subscribe((result) => {
        if (
          result.breakpoints[Breakpoints.HandsetPortrait] ||
          result.breakpoints[Breakpoints.HandsetLandscape]
        ) {
          this.currentBreakpoint = 'mobile';
        } else if (
          result.breakpoints[Breakpoints.TabletPortrait] ||
          result.breakpoints[Breakpoints.TabletLandscape]
        ) {
          this.currentBreakpoint = 'tablet';
        } else if (
          result.breakpoints[Breakpoints.WebPortrait] ||
          result.breakpoints[Breakpoints.WebLandscape]
        ) {
          this.currentBreakpoint = 'desktop';
        }
        console.log('Current Breakpoint:', this.currentBreakpoint);
        this.cdRef.detectChanges(); // Ensure change detection is triggered

        this.desserts.forEach((dessert) => this.updateImage(dessert));
      });
  }

  getImage(dessert: Product): string {
    console.log(
      `Breakpoint: ${this.currentBreakpoint}, Image URL: ${
        dessert.image[this.currentBreakpoint]
      }`
    );
    return dessert.image[this.currentBreakpoint];
  }

  getSrcSet(image: Image): string {
    console.log(
      `SrcSet: ${image.mobile} 600w, ${image.tablet} 800w, ${image.desktop} 1200w`
    );
    return `${image.mobile} 600w, ${image.tablet} 800w, ${image.desktop} 1200w`;
  }

  updateImage(dessert: Product): void {
    // Force a re-render by setting a unique key or a dummy attribute
    const img = document.querySelector(
      `img[src="${dessert.image[this.currentBreakpoint]}"]`
    ) as HTMLImageElement;
    if (img) {
      img.src = ''; // Clear the src
      img.src = dessert.image[this.currentBreakpoint]; // Set the src again
    }
  }

  addToCart(dessert: Product): void {
    this.cartService.addToCart(dessert);
  }

  increaseQuantity(dessert: Product): void {
    dessert.quantity++;
  }

  decreaseQuantity(dessert: Product): void {
    if (dessert.quantity > 1) {
      dessert.quantity--;
    }
  }
}
