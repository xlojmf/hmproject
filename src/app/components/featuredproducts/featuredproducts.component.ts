import { Component } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { ProductService } from 'src/app/services/productservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-featuredproducts',
  templateUrl: './featuredproducts.component.html',
  styleUrls: ['./featuredproducts.component.css']
})
export class FeaturedproductsComponent {

  products!: Produto[];

  constructor(private productService: ProductService,private router: Router) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getFeaturedProducts().subscribe({
      next:(products: Produto[]) => {
        this.products = products;
      },
      error:(error) => {
        console.error('Error loading products:', error);
      }
    });
  }
  
  goToProductOther(productId: number): void {
    const selectedProduct = this.products.find(product => product.id === productId);
    if (selectedProduct) {
      this.router.navigate(['/singleproduct', productId], { state: { product: selectedProduct } });
    }
  }

  goToProduct(productId: number): void {
    this.router.navigate(['/singleproduct', productId]);
  }
}


