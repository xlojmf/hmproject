import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, mergeMap, tap, throwError } from 'rxjs';
import { Cart, Product } from '../models/carts';


@Injectable({
  providedIn: 'root'
})


export class CartService {
  private apiUrl = 'http://localhost:3000/carts';

  constructor(private http: HttpClient) {}

  getCartByUser(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}?userId=${userId}`);
  }


  addProductToCart(cartId: number, product: Product): Observable<Cart> {
    const url = `${this.apiUrl}/${cartId}`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  
    return this.http.get<Cart>(url).pipe(
      mergeMap((cart: Cart) => {
        cart.products.push(product);
        return this.http.put<Cart>(url, cart, options);
      })
    );
  }

  removeProductFromCart(cartId: number, productId: number): Observable<Cart> {
    const url = `${this.apiUrl}/${cartId}`;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  

    return this.http.get<Cart>(url).pipe(
      mergeMap((cart: Cart) => {
        const productIndex = cart.products.findIndex((product) => product.id === productId);
  
        if (productIndex !== -1) {
          cart.products.splice(productIndex, 1);
          return this.http.put<Cart>(url, cart, options);
        } else {
          return throwError(() => new Error(`Product with ID ${productId} not found in Cart ${cartId}`));
        }
      })
    );
  }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart);
  }

  updateCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/${cart.id}`, cart);
  }

  deleteCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cartId}`);
  }
}

