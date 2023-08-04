import { Component,  Input } from '@angular/core';
import { Cart, Product } from 'src/app/models/carts';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css'],
  providers: [MessageService]
})
export class AddToCartComponent {
  @Input() productId!: number;
  currentUser = this.authService.getCurrentUser();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

  }

  showMessage(message: string, severity: string) {
    this.messageService.add({ severity, summary: 'Success', detail: message });
  }

  
  addToCart() {
    const userId = this.currentUser!.id;
    this.cartService.getCartByUser(userId).subscribe({
      next: (carts: Cart[]) => {
        if (carts.length > 0) {
          const cartId = carts[0].id;
          const product: Product = {
            id: this.productId,
            name: '', 
            quantity: 1 
          };
          this.cartService.addProductToCart(cartId, product).subscribe({
            next: (updatedCart: Cart) => {
              console.log('Product added to cart:', updatedCart);
              this.showMessage('Produto adicionado ao seu carrinho', 'success');
              // Perform any additional actions or handle success
            },
            error: (error: any) => {
              console.error('Failed to add product to cart:', error);
              this.showMessage('Ocorreu um erro ao adicionar o produto ao carrinho', 'info');
              // Handle the error
            }
          });
        } else {
          console.log('No cart found for the user.');
          // Create a new cart
          const newCart: Cart = {
            id: Date.now(),
            userId: userId,
            products: [
              {
                id: this.productId,
                name: '', 
                quantity: 1 
              }
            ]
          };
          this.cartService.createCart(newCart).subscribe({
            next: (createdCart: Cart) => {
              this.showMessage('Produto adicionado ao seu carrinho', 'success');

            },
            error: (error: any) => {
              console.error('Failed to create a new cart:', error);
              this.showMessage('Ocorreu um erro ao adicionar o produto ao carrinho', 'info');
            }
          });
        }
      },
      error: (error: any) => {
        console.error('Failed to retrieve user\'s cart:', error);
        this.showMessage('Ocorreu um erro ao adicionar o produto ao carrinho', 'info');
      }
    });
  }
  
  


}
