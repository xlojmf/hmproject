import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { Produto } from 'src/app/models/produto';
import { ProductService } from 'src/app/services/productservice.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-productdashboard',
  templateUrl: './productdashboard.component.html',
  styleUrls: ['./productdashboard.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class ProductdashboardComponent implements OnInit {
  products!: Produto[];
  selectedProduct!: Produto;
  displayDialogProduct!: boolean;
  newProduct!: Produto;
  product!: Produto;
  loading: boolean = true;
  @ViewChild('dt1') dt1!: Table;
  tipoDeProdutos: string[] = [];
  cores: string[] = [];
  tipoDeProdutoFilter!: string;
  corFilter!: string;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.products = [];
    this.loadProducts();
    this.productService.getDistinctTipoDeProdutos().subscribe((tipos) => (this.tipoDeProdutos = tipos));
    this.productService.getDistinctCores().subscribe((cores) => (this.cores = cores));
    this.newProduct = {id: 0, nome: '', marca: '', descricao: '', foto_principal: 'assets/images/image1.png', foto_secundaria: 'assets/images/image1.png', tipo_de_produto: '', cor: '', preco: 0, featured: false, isFavorite: false };

  }

  onInput(event: Event) {
    if (this.dt1) {
      const target = event.target as HTMLInputElement;
      this.dt1.filterGlobal(target.value, 'contains');
    }
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  createProduct(newProduct: Produto): void {
    if (this.newProduct) {
      this.productService.createProduct(this.newProduct).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product created' });
        this.loadProducts();
         // clear the form after product creation
         this.newProduct = { id: 0, nome: '', marca: '', descricao: '', foto_principal: '', foto_secundaria: '', tipo_de_produto: '', cor: '', preco: 0, featured: false, isFavorite: false };
      });
    } else {
      this.productService.updateProduct(this.newProduct).subscribe(() => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated' });
        this.loadProducts();
      });
    }
    this.displayDialogProduct = false;
  }

  updateProduct(product: Produto): void {
    this.productService.updateProduct(product).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating user' });
        console.error('Error updating user:', error);
      },
    });
  }

  deleteProduct(productId: number, event: Event): void {
    event.stopPropagation();

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product deleted successfully' });
            this.loadProducts();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting product' });
            console.error('Error deleting user:', error);
          },
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
            break;
        }
      },
    });
  }


}
