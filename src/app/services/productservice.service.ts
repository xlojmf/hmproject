import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Category } from '../models/category';
import { Produto } from '../models/produto';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/produtos'; // Replace with your JSON server API URL
  private categoryUrl = 'http://localhost:3000/product_categories'; // URL for category data

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getFeaturedProducts(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl)
      .pipe(
        map(products => products.filter(product => product.featured === true))
      );
  }

  getProductById(id: number): Observable<Produto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Produto>(url);
  }

  createProduct(product: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, product);
  }

  updateProduct(product: Produto): Observable<Produto> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<Produto>(url, product);
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl);
  }

  getDistinctTipoDeProdutos(): Observable<string[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      map(products => {
        const uniqueTipos = new Set<string>();
        products.forEach(product => {
          uniqueTipos.add(product.tipo_de_produto);
        });
        return Array.from(uniqueTipos);
      })
    );
  }

  getDistinctCores(): Observable<string[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      map(products => {
        const uniqueCores = new Set<string>();
        products.forEach(product => {
          uniqueCores.add(product.cor);
        });
        return Array.from(uniqueCores);
      })
    );
  }

  getProductsByIds(ids: number[]): Observable<Produto[]> {
    const url = `${this.apiUrl}?id=${ids.join('&id=')}`;
    return this.http.get<Produto[]>(url);
  }
}
