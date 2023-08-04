import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Produto } from 'src/app/models/produto';
import { ProductService } from 'src/app/services/productservice.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-filterproducts',
  templateUrl: './filterproducts.component.html',
  styleUrls: ['./filterproducts.component.css'],
  providers: [MessageService]
})
export class FilterproductsComponent implements OnInit {

  produtos: Produto[] = []; 
  filteredProdutos: Produto[] = [];
  displayedProdutos: Produto[] = []; 
  itemsToShow = 6; 
  additionalItems = 6; 
  totalItems = 0; 

  tipoDeProdutos: string[] = [];
  cores: string[] = [];
  tipoDeProdutoFilter!: string;
  corFilter!: string;
  isHovered: { [key: string]: boolean } = {};
  loggedIn = localStorage.getItem('loggedIn');

  constructor(private productService: ProductService, private messageService: MessageService,private wishlistService: WishlistService,private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.produtos = products;
        this.filteredProdutos = products; 
        this.totalItems = this.filteredProdutos.length; 
        this.applyFilters(); 
      },
      error: (error) => {
        console.error('Error retrieving products:', error);
      }
    });

    this.productService.getDistinctTipoDeProdutos().subscribe(
      tipos => (this.tipoDeProdutos = tipos)
    );
    this.productService.getDistinctCores().subscribe(cores => (this.cores = cores));
  }

  applyFilters(): void {
    // Filter tipo_de_produto and cor
    const filteredProducts = this.produtos.filter(product => {
      if (this.tipoDeProdutoFilter && this.corFilter) {
        // Filter by both tipo_de_produto and cor
        return (
          product.tipo_de_produto === this.tipoDeProdutoFilter &&
          product.cor === this.corFilter
        );
      } else if (this.tipoDeProdutoFilter) {
        // Filter only by tipo_de_produto
        return product.tipo_de_produto === this.tipoDeProdutoFilter;
      } else if (this.corFilter) {
        // Filter only by cor
        return product.cor === this.corFilter;
      }
      // No filters selected, return all products
      return true;
    });

    // Update the filtered products, displayed products, and total items count
    this.filteredProdutos = filteredProducts;
    this.totalItems = this.filteredProdutos.length;
    this.displayedProdutos = this.filteredProdutos.slice(0, this.itemsToShow);
  } 
  
  resetFilters(): void {
    this.tipoDeProdutoFilter = '';
    this.corFilter = '';
    this.applyFilters();
  }

  loadMore(): void {
    const endIndex = this.displayedProdutos.length + this.additionalItems;
    this.displayedProdutos = this.filteredProdutos.slice(0, endIndex);
  }

  getTotalItemsShown(): number {
    return this.displayedProdutos.length;
  }

  addToFavorites(produto: Produto) {
    produto.isFavorite = !produto.isFavorite;
  
    if (produto.isFavorite) {
      this.wishlistService.addToWishlist(produto);
      this.showMessage('Produto adicionado aos seus favoritos', 'success');
    } else {
      this.wishlistService.removeFromWishlist(produto);
      this.showMessage('Produto removido dos seus favoritos', 'info');
    }
  }

  showMessage(message: string, severity: string) {
    this.messageService.add({ severity, summary: 'Success', detail: message });
  }



  toggleHover(product: any) {
    this.isHovered[product.id] = !this.isHovered[product.id];
  }


  goToProduct(productId: number): void {
    this.router.navigate(['/singleproduct', productId]);
  }
}