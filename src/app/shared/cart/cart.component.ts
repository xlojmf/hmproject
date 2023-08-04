import { Component, OnInit } from '@angular/core';
import { Cart, Product } from 'src/app/models/carts';
import { Produto } from 'src/app/models/produto';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/productservice.service';
import { switchMap, tap, map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  cart!: Cart[];
  products!: Produto[];
  total!: number;
  currentUser = this.authService.getCurrentUser();

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const userId = this.currentUser!.id;
  
    this.cartService.getCartByUser(userId).pipe(
      switchMap(cart => {
        this.cart = cart;       
        return this.loadProducts();
      })
    ).subscribe({
      next: () => {
        this.calculateTotal();
      },
      error: error => {
        // Handle error if necessary
      }
    });

  }

  showMessage(message: string, severity: string) {
    this.messageService.add({ severity, summary: 'Success', detail: message });
  }


  loadProducts(): Observable<void> {
    const productIds = this.cart[0].products?.map(product => product.id);
    return this.productService.getProductsByIds(productIds).pipe(
      tap(products => {
        this.products = products;
        this.calculateTotal();
      }),
      map(() => undefined) 
    );
  }
  

  calculateTotal() {
    this.total = this.products.reduce(
      (sum, product) => sum + product.preco * this.getQuantity(product.id),
      0
    );
  }

  getQuantity(productId: number): number {
    const product = this.cart[0].products.find(p => p.id === productId);
    return product ? product.quantity : 0;
  }


  removeProduct(productId: number) {
    const cartId = this.cart[0].id;
    
    this.cartService.removeProductFromCart(cartId, productId).pipe(
      switchMap(() => {
        return this.cartService.getCartByUser(this.currentUser!.id);
      }),
      switchMap((cart: Cart[]) => {
        this.cart = cart;
        const productIds = this.cart[0].products?.map(product => product.id);
        return this.productService.getProductsByIds(productIds);
      })
    ).subscribe({
      next: (products: Produto[]) => {
        this.products = products;
        this.showMessage('Produto removido do seu carrinho', 'success');
        this.calculateTotal();
      },
      error: (error: any) => {
        console.log("Error:", error);
      },
      complete: () => {
        console.log("Complete");
      }
    });
  }


}


