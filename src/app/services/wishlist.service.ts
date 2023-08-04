import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: Produto[] = [];

  addToWishlist(produto: Produto): void {
    if (!this.isInWishlist(produto)) {
      this.wishlist.push(produto);
    }
  }

  removeFromWishlist(produto: Produto): void {
    const index = this.wishlist.findIndex(p => p.id === produto.id);
    if (index !== -1) {
      this.wishlist.splice(index, 1);
    }
  }

  getWishlist(): Produto[] {
    console.log(this.wishlist);
    return this.wishlist;
  }

  isInWishlist(produto: Produto): boolean {
    return this.wishlist.some(p => p.id === produto.id);
  }
}