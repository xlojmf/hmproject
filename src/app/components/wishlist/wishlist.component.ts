import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { WishlistService } from 'src/app/services/wishlist.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Produto[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.wishlist = this.wishlistService.getWishlist();
  }

  removeFromWishlist(produto: Produto): void {
    this.wishlistService.removeFromWishlist(produto);
    this.wishlist = this.wishlistService.getWishlist();
  }
}
